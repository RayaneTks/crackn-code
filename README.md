# 🏴‍☠️ Crack'N Code

**Apprends à coder en jouant !**

Crack'N Code est une plateforme d'apprentissage interactive qui te permet de maîtriser 8 langages de programmation à travers des défis captivants et des mini-jeux.

🌐 **Application en ligne** : [https://crackn-code.alwaysdata.net/](https://crackn-code.alwaysdata.net/)

---

## ✨ Fonctionnalités

- 🎮 **Apprentissage gamifié** : Progresse à travers différents niveaux de difficulté
- 💻 **8 langages de programmation** : HTML/CSS, JavaScript, Python, Java, C++, PHP, SQL, et plus
- 👤 **Authentification Google OAuth** : Connexion sécurisée avec ton compte Google
- 📊 **Système de progression** : Suis ton avancement et débloque de nouveaux niveaux
- 🎯 **Défis interactifs** : Résous des problèmes de code en temps réel
- 🤖 **Assistant Crack'n** : Un chatbot pirate pour t'aider dans ton aventure

---

## 🛠️ Stack Technique

### Frontend
- **React** avec Vite
- **TypeScript**
- **Tailwind CSS** pour le styling
- **Socket.io Client** pour la communication temps réel

### Backend
- **Node.js** avec Express
- **TypeScript**
- **Prisma ORM** pour la gestion de base de données
- **MySQL** comme base de données
- **Socket.io** pour le temps réel
- **Passport.js** avec Google OAuth 2.0

### Déploiement
- Hébergement : **AlwaysData**
- Base de données : **MySQL** (AlwaysData)

---

## 🚀 Installation et Lancement en Local

### Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **MySQL** installé localement ou accès à une base de données MySQL
- Un compte **Google Cloud** pour OAuth

### Étape 1 : Cloner le repository

```bash
git clone https://github.com/lucasbianciotto/CrackNCode.git
cd CrackNCode
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

### Étape 3 : Configurer la base de données MySQL locale

1. **Créer une base de données MySQL** :

```sql
CREATE DATABASE crackncode;
```

2. **Créer un utilisateur MySQL** (optionnel) :

```sql
CREATE USER 'crackncode_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON crackncode.* TO 'crackncode_user'@'localhost';
FLUSH PRIVILEGES;
```

### Étape 4 : Configurer Google OAuth pour le développement local

1. **Accéder à Google Cloud Console** :
   - Va sur [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Crée un nouveau projet ou sélectionne un projet existant

2. **Configurer l'écran de consentement OAuth** :
   - Va dans "APIs & Services" > "Écran de consentement OAuth"
   - Configure les informations de base de ton application

3. **Créer des identifiants OAuth 2.0** :
   - Va dans "APIs & Services" > "Identifiants"
   - Clique sur "Créer des identifiants" > "ID client OAuth 2.0"
   - Sélectionne "Application Web"
   - Ajoute les URI autorisées :
     - **Origines JavaScript autorisées** : `http://localhost:8080`
     - **URI de redirection autorisés** : `http://localhost:4000/auth/google/callback`
   - Récupère ton `CLIENT_ID` et `CLIENT_SECRET`

### Étape 5 : Configurer le fichier `.env`

Crée un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Base de données
DATABASE_URL="mysql://crackncode_user:votre_mot_de_passe@localhost:3306/crackncode"

# Google OAuth
GOOGLE_CLIENT_ID="votre_client_id_google"
GOOGLE_CLIENT_SECRET="votre_client_secret_google"
GOOGLE_CALLBACK_URL="http://localhost:4000/auth/google/callback"

# Session
SESSION_SECRET="votre_secret_session_aleatoire"

# URLs
CLIENT_ORIGIN="http://localhost:8080"
VITE_API_BASE_URL="http://localhost:4000"

# Node Environment
NODE_ENV="development"
```

### Étape 6 : Initialiser la base de données avec Prisma

1. **Générer le client Prisma** :

```bash
npm run prisma:generate
```

2. **Exécuter les migrations** :

```bash
npm run prisma:migrate:deploy
```

Ou pour créer une nouvelle migration en développement :

```bash
npx prisma migrate dev
```

### Étape 7 : Lancer l'application

1. **En mode développement** (avec hot-reload) :

```bash
npm run dev
```

Cette commande va lancer :
- Le serveur backend sur `http://localhost:4000`
- Le frontend Vite sur `http://localhost:8080`

2. **Accéder à l'application** :
   - Ouvre ton navigateur sur [http://localhost:8080](http://localhost:8080)

---

## 📝 Scripts Disponibles

```bash
npm run dev              # Lance le frontend et backend en mode développement
npm run build            # Build le frontend pour la production
npm run start            # Lance le serveur en mode production
npm run prisma:generate  # Génère le client Prisma
npm run prisma:migrate:deploy  # Exécute les migrations Prisma
npm run prisma:studio    # Ouvre Prisma Studio (interface de gestion de BDD)
```

---

## 📁 Structure du Projet

```
CrackNCode/
├── client/              # Code source du frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Composants React réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── hooks/         # Hooks React personnalisés
│   │   └── utils/         # Fonctions utilitaires
│   └── public/          # Fichiers statiques
├── server/             # Code source du backend (Node.js + Express)
│   ├── routes/        # Routes de l'API
│   ├── controllers/   # Contrôleurs
│   ├── middleware/    # Middlewares Express
│   └── index.js       # Point d'entrée du serveur
├── prisma/             # Schéma et migrations Prisma
│   ├── schema.prisma    # Schéma de la base de données
│   └── migrations/     # Fichiers de migration
├── public/             # Assets publics
├── dist/               # Build du frontend (généré)
├── .env                # Variables d'environnement (NE PAS COMMITTER)
├── package.json        # Dépendances et scripts
└── README.md           # Ce fichier
```

---

## ⚠️ Notes Importantes

### Sécurité
- **Ne jamais committer le fichier `.env`** - Il contient des informations sensibles
- Utilise des secrets forts pour `SESSION_SECRET`
- En production, active HTTPS obligatoirement pour OAuth

### Prisma
- Après chaque modification du schéma Prisma, exécute `npx prisma generate`
- Pour créer une migration : `npx prisma migrate dev --name nom_migration`
- Pour visualiser la BDD : `npx prisma studio`

### Développement
- Le hot-reload est actif sur le frontend et le backend
- Les logs du serveur apparaissent dans le terminal

---

## 👥 Contributeurs

- **Lucas BIANCIOTTO** - [lucasbianciotto](https://github.com/lucasbianciotto)
- **Fabio VOLIANI**
- **Amel BOUNNECHE**

---

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🚀 Déploiement en Production

L'application est actuellement déployée sur AlwaysData. Pour déployer ta propre version :

### Configuration pour AlwaysData (ou hébergeur similaire)

1. **Modifier les URLs dans `.env` pour la production** :
```env
CLIENT_ORIGIN="https://ton-domaine.alwaysdata.net"
VITE_API_BASE_URL="https://ton-domaine.alwaysdata.net"
GOOGLE_CALLBACK_URL="https://ton-domaine.alwaysdata.net/auth/google/callback"
NODE_ENV="production"
```

2. **Mettre à jour les URLs OAuth dans Google Cloud Console** :
   - **Origines JavaScript autorisées** : `https://ton-domaine.alwaysdata.net`
   - **URI de redirection** : `https://ton-domaine.alwaysdata.net/auth/google/callback`

3. **Modifier `server/index.js` pour écouter sur IPv6** (requis par AlwaysData) :
```javascript
const host = isProduction ? "::" : "localhost"; // IPv6 pour AlwaysData
```

4. **Builder et déployer** :
```bash
npm run build
npm run prisma:generate
npm run prisma:migrate:deploy
```

---

**Équipe Crack'N Code - Apprends à coder en naviguant sur les mers du code ! 🏴‍☠️**
