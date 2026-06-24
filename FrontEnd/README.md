# Agroking — Frontend

Application web de gestion et vente de produits piscicoles.

## Stack technique

| Couche | Technologie |
|---|---|
| UI | React 19 + Vite |
| Style | Tailwind CSS 4 |
| Navigation | React Router DOM 7 |
| Animations | Framer Motion |
| Requêtes HTTP | Axios |
| Notifications | React Hot Toast |
| Icônes | Lucide React / React Icons |
| Emails | EmailJS |
| Stockage médias | Cloudinary (images + vidéos) |
| Base de données | MongoDB Atlas via Mongoose (BackEnd) |

## Commandes

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## Variables d'environnement

Créer un fichier `.env` à la racine du dossier `FrontEnd/` :

```env
VITE_CLOUDINARY_NAME=dkv7cnmaa
```

## Déploiement

Le frontend est déployé sur **Vercel** : [agroking.vercel.app](https://agroking.vercel.app)

- Chaque `git push` sur `main` déclenche un redéploiement automatique sur Vercel.
- Le backend est déployé sur **Render** : `agroking-8zxq.onrender.com`

## Pourquoi Supabase a été retiré

Le projet utilisait initialement **Supabase Storage** pour héberger les vidéos (Hero.mp4, blog1.mp4 → blog22.mp4).

Supabase a été retiré pour deux raisons :

1. **Mise en pause automatique** : Supabase suspend les projets gratuits après 1 semaine d'inactivité. Cela causait des erreurs `ERR_NAME_NOT_RESOLVED` sur toutes les vidéos dès que le projet n'était plus utilisé.
2. **Centralisation** : Cloudinary était déjà utilisé pour les images produits et les images de blog. Migrer les vidéos vers Cloudinary unifie le stockage sur une seule plateforme sans risque de mise en pause.

Toutes les vidéos ont été uploadées manuellement sur Cloudinary et les URLs en base de données MongoDB ont été mises à jour via le script `BackEnd/src/scripts/migrateVideosToCloudinary.js`.
