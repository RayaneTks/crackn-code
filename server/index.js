import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:8080";
const prisma = new PrismaClient();

// In-memory user store (squelette). À remplacer par une vraie base plus tard
const usersByGoogleId = new Map();

// Valeurs par défaut de la personnalisation, alignées avec l'avatar initial du front
const DEFAULT_PERSONALISATION_DB = {
    accessories: "Blank",
    hat_colors: null,
    hair_colors: "Brown",
    facial_hair_types: "Blank",
    facial_hair_colors: null,
    clothes: "Hoodie",
    clothes_colors: "Blue03",
    graphics: null,
    eyes: "Default",
    eyebrows: "Default",
    mouth_types: "Smile",
    skin_colors: "Light",
    hair: null,
};

app.use(
	cors({
		origin: CLIENT_ORIGIN,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET || "devlingo-secret",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
	const user = usersByGoogleId.get(googleId) || null;
	done(null, user);
});

const hasGoogleCreds = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

if (!hasGoogleCreds) {
    console.error("[Auth] GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET manquants. Ajoutez-les dans .env pour activer Google OAuth.");
}

if (hasGoogleCreds) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:
                    process.env.GOOGLE_CALLBACK_URL || `http://localhost:${DEFAULT_PORT}/auth/google/callback`,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const googleId = profile.id;

                    // Assure la présence d'un utilisateur en base: crée à la première connexion
                    await prisma.user.upsert({
                        where: { id_google: googleId },
                        create: {
                            id_google: googleId,
                            nom: profile.name?.familyName || profile.displayName || "Inconnu",
                            prenom: profile.name?.givenName || profile.displayName || "Utilisateur",
                            xp_global: 0,
                        },
                        update: {},
                    });

                    // Crée la personnalisation par défaut si elle n'existe pas encore
                    await prisma.personalisation.upsert({
                        where: { id_user: googleId },
                        create: {
                            id_user: googleId,
                            ...DEFAULT_PERSONALISATION_DB,
                        },
                        update: {},
                    });

                    let user = usersByGoogleId.get(googleId);
                    if (!user) {
                        user = {
                            id: randomUUID(),
                            googleId,
                            email: profile.emails?.[0]?.value || "",
                            username: profile.displayName || profile.name?.givenName || "Utilisateur",
                            avatar:
                                (profile.photos && profile.photos[0] && profile.photos[0].value) || "",
                            level: 1,
                            currentXP: 0,
                            xpToNextLevel: 100,
                            totalXP: 0,
                            completedChallenges: 0,
                            achievements: [],
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        };
                        usersByGoogleId.set(googleId, user);
                    } else {
                        user.updatedAt = new Date().toISOString();
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );
}

// Routes OAuth Google
app.get("/auth/google", (req, res, next) => {
    if (!hasGoogleCreds) {
        return res.status(500).json({ error: "Google OAuth non configuré. Définissez GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET dans .env" });
    }
    return passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

app.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/auth/failure" }),
	(req, res) => {
		res.redirect(`${CLIENT_ORIGIN}/`);
	}
);

app.get("/auth/failure", (_req, res) => {
	res.status(401).json({ error: "Authentication failed" });
});

app.post("/api/logout", (req, res) => {
	req.logout(() => {
		res.clearCookie("connect.sid");
		res.status(204).end();
	});
});

// API utilisateur
app.get("/api/me", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false });
    }

    try {
        // Récupère xp_global depuis la base via Prisma en se basant sur l'id Google
        const dbUser = await prisma.user.findUnique({
            where: { id_google: req.user.googleId },
            select: { xp_global: true },
        });

        // Récupère la personnalisation en base et la mappe vers les options d'avatar du front
        const pers = await prisma.personalisation.findUnique({
            where: { id_user: req.user.googleId },
        });
        let avatarOptions = toAvatarOptionsFromDb(pers);
        if (!avatarOptions) {
            avatarOptions = toAvatarOptionsFromDb(DEFAULT_PERSONALISATION_DB);
        }

        const userWithXp = { ...req.user, xp_global: dbUser?.xp_global ?? 0, avatarOptions };
        return res.json({ authenticated: true, user: userWithXp });
    } catch (err) {
        console.error("/api/me prisma error:", err);
        // En cas d'erreur DB, renvoyer quand même l'utilisateur en mémoire, xp_global=0 par défaut
        return res.json({ authenticated: true, user: { ...req.user, xp_global: 0, avatarOptions: toAvatarOptionsFromDb(DEFAULT_PERSONALISATION_DB) } });
    }
});

app.put("/api/user", (req, res) => {
	if (!req.user) return res.status(401).json({ error: "Unauthorized" });
	const { username } = req.body || {};
	if (typeof username === "string" && username.trim().length >= 2) {
		const user = usersByGoogleId.get(req.user.googleId);
		user.username = username.trim();
		user.updatedAt = new Date().toISOString();
		return res.json({ user });
	}
	return res.status(400).json({ error: "Nom d'utilisateur invalide" });
});

// Utilitaires de mapping entre DB et options d'avatar (front)
function toAvatarOptionsFromDb(db) {
    if (!db) return null;
    return {
        avatarStyle: "Circle",
        topType: db.hair || "ShortHairShortFlat", // hair stocke le topType en DB
        accessoriesType: db.accessories || "Blank",
        hatColor: db.hat_colors || "Black",
        hairColor: db.hair_colors || "Brown",
        facialHairType: db.facial_hair_types || "Blank",
        facialHairColor: db.facial_hair_colors || "Brown",
        clotheType: db.clothes || "Hoodie",
        clotheColor: db.clothes_colors || "Blue03",
        graphicType: db.graphics || "Bat",
        eyeType: db.eyes || "Default",
        eyebrowType: db.eyebrows || "Default",
        mouthType: db.mouth_types || "Smile",
        skinColor: db.skin_colors || "Light",
    };
}

function toDbFromAvatarOptions(opts) {
    if (!opts) return {};
    return {
        accessories: opts.accessoriesType ?? null,
        hat_colors: opts.hatColor ?? null,
        hair_colors: opts.hairColor ?? null,
        facial_hair_types: opts.facialHairType ?? null,
        facial_hair_colors: opts.facialHairColor ?? null,
        clothes: opts.clotheType ?? null,
        clothes_colors: opts.clotheColor ?? null,
        graphics: opts.graphicType ?? null,
        eyes: opts.eyeType ?? null,
        eyebrows: opts.eyebrowType ?? null,
        mouth_types: opts.mouthType ?? null,
        skin_colors: opts.skinColor ?? null,
        hair: opts.topType ?? null,
    };
}

// Routes de personnalisation
app.get("/api/personalisation", async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    try {
        const db = await prisma.personalisation.findUnique({
            where: { id_user: req.user.googleId },
        });
        if (!db) {
            // Retourne des valeurs par défaut si aucune personnalisation en DB
            return res.json({ personalisation: DEFAULT_PERSONALISATION_DB });
        }
        return res.json({ personalisation: db });
    } catch (err) {
        console.error("GET /api/personalisation error:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/personalisation", async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    try {
        const data = toDbFromAvatarOptions(req.body || {});
        const saved = await prisma.personalisation.upsert({
            where: { id_user: req.user.googleId },
            create: { id_user: req.user.googleId, ...data },
            update: data,
        });
        return res.json({ personalisation: saved });
    } catch (err) {
        console.error("POST /api/personalisation error:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

app.put("/api/personalisation", async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    try {
        const data = toDbFromAvatarOptions(req.body || {});
        const saved = await prisma.personalisation.upsert({
            where: { id_user: req.user.googleId },
            create: { id_user: req.user.googleId, ...data },
            update: data,
        });
        return res.json({ personalisation: saved });
    } catch (err) {
        console.error("PUT /api/personalisation error:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

app.get("/health", (_req, res) => {
	res.json({ ok: true });
});

// Dev-friendly startup: if port is busy and no explicit PORT is set, try the next port.
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Auth server running on http://localhost:${port}`);
        if (hasGoogleCreds && !process.env.GOOGLE_CALLBACK_URL && port !== DEFAULT_PORT) {
            console.warn(
                `[Auth] Attention: port modifié (${port}) mais GOOGLE_CALLBACK_URL n'est pas défini. Le callback Google par défaut vise le port ${DEFAULT_PORT}. Définissez GOOGLE_CALLBACK_URL pour OAuth.`,
            );
        }
    });

    server.on("error", (err) => {
        if (err && err.code === "EADDRINUSE") {
            // Si l'utilisateur a explicitement défini PORT, ne pas auto-shifter: demander de libérer le port.
            const explicitPort = Boolean(process.env.PORT);
            if (!explicitPort && !hasGoogleCreds) {
                const next = port + 1;
                console.warn(`[Server] Le port ${port} est occupé. Tentative sur le port ${next}...`);
                // Petite attente pour laisser le port se libérer si le process concurrent se termine.
                setTimeout(() => startServer(next), 300);
            } else {
                console.error(
                    `[Server] Le port ${port} est déjà utilisé. Libérez-le ou définissez une variable d'environnement PORT différente.`,
                );
                process.exit(1);
            }
        } else {
            console.error(`[Server] Erreur au démarrage:`, err);
            process.exit(1);
        }
    });
}

startServer(DEFAULT_PORT);


