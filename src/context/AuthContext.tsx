import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { UserProfile } from "@/types";

type AuthState = {
	user: UserProfile | null;
	loading: boolean;
	loginWithGoogle: () => void;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMe = async () => {
			try {
				const res = await fetch(`${API_BASE}/api/me`, {
					credentials: "include",
				});
				if (res.ok) {
					const data = await res.json();
					if (data?.authenticated && data?.user) {
						// Mapper xp_global en champs d'XP attendus par l'UI
						const baseUser = data.user as any;
						const xpGlobal = typeof baseUser.xp_global === "number" ? baseUser.xp_global : 0;
						const LEVEL_SIZE = 1000; // XP requis par niveau (simple palier constant)
						const level = Math.floor(xpGlobal / LEVEL_SIZE) + 1;
						const currentXP = xpGlobal % LEVEL_SIZE;
						const xpToNextLevel = LEVEL_SIZE;
						const totalXP = xpGlobal;

						const mapped: UserProfile = {
							id: baseUser.id,
							username: baseUser.username,
							level,
							currentXP,
							xpToNextLevel,
							totalXP,
							completedChallenges: baseUser.completedChallenges ?? 0,
							achievements: baseUser.achievements ?? [],
						};
						// Propager les options d'avatar si présentes côté serveur
						const withAvatar = { ...(mapped as any), avatarOptions: baseUser.avatarOptions };
						setUser(withAvatar as UserProfile);
					} else {
						setUser(null);
					}
				} else {
					setUser(null);
				}
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchMe();
	}, []);

	const loginWithGoogle = () => {
		window.location.href = `${API_BASE}/auth/google`;
	};

	const logout = async () => {
		await fetch(`${API_BASE}/api/logout`, { method: "POST", credentials: "include" });
		setUser(null);
	};

	const value = useMemo(
		() => ({ user, loading, loginWithGoogle, logout }),
		[user, loading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	if (loading) return null;
	if (!user) return null;
	return <>{children}</>;
}


