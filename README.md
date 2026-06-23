# Agroking

Agroking est une application web full-stack dédiée à la gestion d’un site e-commerce agricole avec une interface utilisateur publique et un tableau de bord administrateur.

## Fonctionnalités principales

- Inscription et connexion utilisateur
- Navigation des produits
- Panier et commandes
- Gestion des produits, clients, commandes et paramètres côté administration
- Gestion du blog
- Stockage de médias via Cloudinary/Supabase

## Stack technique

- Frontend : React, Vite, Tailwind CSS, React Router
- Backend : Node.js, Express, MongoDB, Mongoose, JWT
- Authentification : JWT
- Stockage média : Cloudinary et Supabase

## Structure du projet

```text
Agroking-main/
├── BackEnd/
│   ├── src/
│   ├── package.json
│   └── .env
├── FrontEnd/
│   ├── src/
│   ├── package.json
│   └── .env
└── README.md
```

## Prérequis

- Node.js 18+
- npm ou yarn
- MongoDB (Atlas ou instance locale)
- Compte Cloudinary
- Compte Supabase

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd Agroking-main
```

### 2. Installer les dépendances du backend

```bash
cd BackEnd
npm install
```

### 3. Installer les dépendances du frontend

```bash
cd ../FrontEnd
npm install
```

## Configuration des variables d’environnement

### Backend

Créer un fichier .env dans le dossier BackEnd avec les variables suivantes :

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Frontend

Créer un fichier .env dans le dossier FrontEnd avec :

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Lancer l’application

### Backend

```bash
cd BackEnd
npm run dev
```

Le backend sera disponible sur :

```text
http://localhost:5000
```

### Frontend

```bash
cd FrontEnd
npm run dev
```

Le frontend sera disponible sur :

```text
http://localhost:5173
```

## Scripts disponibles

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Notes importantes

- Le backend expose des routes API sous le préfixe /api.
- L’application frontend et le backend sont configurés pour fonctionner localement avec CORS.
- En production, il est recommandé de sécuriser les variables d’environnement et les clés d’API.

## Licence

Ce projet est distribué sous licence ISC.
