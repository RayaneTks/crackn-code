# Guide de déploiement sur Alwaysdata

Ce guide explique comment déployer votre application CrackNCode sur Alwaysdata.

## 📋 Prérequis

1. Un compte Alwaysdata avec accès SSH
2. Node.js installé sur votre serveur Alwaysdata
3. Une base de données MySQL créée sur Alwaysdata
4. Un projet Google OAuth configuré avec les bonnes URLs de redirection

## 🚀 Étapes de déploiement

### 1. Préparer votre projet local

Assurez-vous que votre projet est prêt :
- Le code est à jour
- Les migrations Prisma sont prêtes
- Le build de production fonctionne

### 2. Uploader votre projet sur Alwaysdata

#### Option A : Via Git (recommandé)

```bash
# Sur votre machine locale
git remote add alwaysdata ssh://votre-compte@ssh-[compte].alwaysdata.net/home/[compte]/www
git push alwaysdata main
```

#### Option B : Via FTP/SFTP

- Connectez-vous à votre serveur Alwaysdata via FTP/SFTP
- Uploadez tous les fichiers du projet (sauf `node_modules` et `.env`)

### 3. Configuration de la base de données

1. **Créer une base de données MySQL sur Alwaysdata** :
   - Connectez-vous à votre panel Alwaysdata
   - Allez dans "Bases de données" → "MySQL"
   - Créez une nouvelle base de données
   - Notez le nom de la base, l'utilisateur et le mot de passe

2. **Configurer la connexion Prisma** :
   - La variable `DATABASE_URL` sera configurée dans les variables d'environnement (voir étape 5)

### 4. Configuration des variables d'environnement

Dans votre panel Alwaysdata, allez dans "Variables d'environnement" et ajoutez :

#### Variables obligatoires

```bash
# Base de données MySQL
DATABASE_URL="mysql://utilisateur:mot-de-passe@mysql-[compte].alwaysdata.net:3306/nom-de-la-base"

# Environnement
NODE_ENV="production"
PORT="3000"  # Le port fourni par Alwaysdata (à vérifier dans votre configuration)

# OAuth Google
GOOGLE_CLIENT_ID="votre-client-id-google"
GOOGLE_CLIENT_SECRET="votre-client-secret-google"
GOOGLE_CALLBACK_URL="https://votre-domaine.alwaysdata.net/auth/google/callback"

# Origine du client (votre domaine)
CLIENT_ORIGIN="https://votre-domaine.alwaysdata.net"

# Secret de session (générez une chaîne aléatoire sécurisée)
SESSION_SECRET="générez-une-chaîne-aléatoire-très-longue-et-sécurisée"

# URL de l'API (pour le frontend)
VITE_API_BASE_URL="https://votre-domaine.alwaysdata.net"
```

#### Exemple de DATABASE_URL pour Alwaysdata

```
mysql://mon_compte:mon_mot_de_passe@mysql-moncompte.alwaysdata.net:3306/moncompte_crackncode
```

### 5. Configuration OAuth Google

1. **Dans la console Google Cloud** :
   - Allez dans "APIs & Services" → "Credentials"
   - Modifiez votre OAuth 2.0 Client ID
   - Ajoutez l'URI de redirection autorisée :
     ```
     https://votre-domaine.alwaysdata.net/auth/google/callback
     ```
   - Ajoutez les origines JavaScript autorisées :
     ```
     https://votre-domaine.alwaysdata.net
     ```

2. **Vérifiez que les variables d'environnement sont correctes** :
   - `GOOGLE_CLIENT_ID` : Votre Client ID Google
   - `GOOGLE_CLIENT_SECRET` : Votre Client Secret Google
   - `GOOGLE_CALLBACK_URL` : `https://votre-domaine.alwaysdata.net/auth/google/callback`
   - `CLIENT_ORIGIN` : `https://votre-domaine.alwaysdata.net`

### 6. Installation des dépendances et build

Via SSH, connectez-vous à votre serveur Alwaysdata :

```bash
ssh votre-compte@ssh-[compte].alwaysdata.net
cd ~/www
```

Puis exécutez :

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npm run prisma:generate

# Exécuter les migrations (production)
npm run prisma:migrate:deploy

# Builder le frontend pour la production
# IMPORTANT: VITE_API_BASE_URL doit être définie avant le build
# Elle sera intégrée dans le code JavaScript au moment du build
export VITE_API_BASE_URL="https://votre-domaine.alwaysdata.net"
npm run build
# Ou en une seule ligne :
# VITE_API_BASE_URL="https://votre-domaine.alwaysdata.net" npm run build
```

### 7. Configuration du serveur web (Node.js)

Dans votre panel Alwaysdata :

1. **Allez dans "Web" → "Sites"**
2. **Créez ou modifiez un site** :
   - Type : Node.js
   - Port : Le port fourni par Alwaysdata (généralement dans les variables d'environnement)
   - Dossier racine : `/home/[compte]/www`
   - Fichier de démarrage : `server/index.js`
   - Commande de démarrage : `npm start` ou `node server/index.js`

3. **Variables d'environnement** :
   - Assurez-vous que toutes les variables d'environnement sont définies dans le panel Alwaysdata

### 8. Démarrer l'application

Dans le panel Alwaysdata :
- Redémarrez votre site web
- Vérifiez les logs pour voir si l'application démarre correctement

## 🔧 Vérifications

### Vérifier que l'application fonctionne

1. **Test de santé** :
   ```
   https://votre-domaine.alwaysdata.net/health
   ```
   Devrait retourner : `{"ok":true}`

2. **Test de l'API** :
   ```
   https://votre-domaine.alwaysdata.net/api/leaderboard
   ```
   Devrait retourner le leaderboard (même vide)

3. **Test OAuth** :
   - Accédez à votre site
   - Cliquez sur "Se connecter avec Google"
   - Vérifiez que la redirection fonctionne

### Problèmes courants

#### ❌ L'application ne démarre pas

- Vérifiez les logs dans le panel Alwaysdata
- Vérifiez que le port est correct
- Vérifiez que `NODE_ENV=production` est défini
- Vérifiez que toutes les variables d'environnement sont définies

#### ❌ Erreur de connexion à la base de données

- Vérifiez que `DATABASE_URL` est correcte
- Vérifiez que la base de données MySQL est créée
- Vérifiez que l'utilisateur a les droits nécessaires
- Vérifiez que les migrations Prisma sont exécutées : `npm run prisma:migrate:deploy`

#### ❌ OAuth ne fonctionne pas

- Vérifiez que `GOOGLE_CALLBACK_URL` correspond exactement à l'URL configurée dans Google Cloud Console
- Vérifiez que `CLIENT_ORIGIN` est correct
- Vérifiez que les URLs dans Google Cloud Console incluent `https://` (pas `http://`)
- Vérifiez que les variables `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont correctes

#### ❌ Les fichiers statiques ne se chargent pas

- Vérifiez que `npm run build` a été exécuté
- Vérifiez que le dossier `dist/` existe et contient les fichiers
- Vérifiez que `NODE_ENV=production` est défini

#### ❌ Erreur CORS

- Vérifiez que `CLIENT_ORIGIN` est correct (avec `https://`)
- Vérifiez la configuration CORS dans `server/index.js`

## 📝 Notes importantes

### Sécurité

- ⚠️ **Ne commitez jamais vos fichiers `.env`** dans Git
- ⚠️ **Générez un `SESSION_SECRET` fort et unique** pour la production
- ⚠️ **Retirez les endpoints admin** (`/api/admin/*`) en production si vous ne voulez pas les exposer

### Performance

- Le serveur sert à la fois l'API et les fichiers statiques
- En production, le frontend est pré-buildé dans le dossier `dist/`
- Les sessions sont stockées en mémoire (considérez utiliser Redis pour la production à grande échelle)

### Mises à jour

Pour mettre à jour l'application :

```bash
# Via SSH
cd ~/www
git pull  # Si vous utilisez Git
npm install
npm run prisma:generate
npm run prisma:migrate:deploy
npm run build
# Redémarrer l'application dans le panel Alwaysdata
```

## 🎯 Checklist de déploiement

- [ ] Base de données MySQL créée
- [ ] Variables d'environnement configurées dans Alwaysdata
- [ ] OAuth Google configuré avec les bonnes URLs
- [ ] Dépendances installées (`npm install`)
- [ ] Client Prisma généré (`npm run prisma:generate`)
- [ ] Migrations exécutées (`npm run prisma:migrate`)
- [ ] Frontend buildé (`npm run build`)
- [ ] Site web configuré dans Alwaysdata
- [ ] Application démarrée
- [ ] Test de santé réussi (`/health`)
- [ ] Test OAuth réussi
- [ ] Vérification des logs

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans le panel Alwaysdata
2. Vérifiez que toutes les variables d'environnement sont correctes
3. Vérifiez la documentation Alwaysdata : https://help.alwaysdata.com/

Bon déploiement ! 🚀

