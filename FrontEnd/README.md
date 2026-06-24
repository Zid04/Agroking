# Agroking — Frontend

Application web de gestion et vente de produits piscicoles.

## Stack technique

- **React** + Vite
- **Tailwind CSS**
- **React Router**
- **Cloudinary** — stockage des images produits et vidéos

## Variables d'environnement

```env
VITE_CLOUDINARY_NAME=dkv7cnmaa
```

## Pourquoi Supabase a été retiré

Le projet utilisait initialement **Supabase Storage** pour héberger les vidéos (Hero.mp4, blog1.mp4 → blog22.mp4).

Supabase a été retiré pour deux raisons :

1. **Mise en pause automatique** : Supabase suspend les projets gratuits après 1 semaine d'inactivité. Cela causait des erreurs `ERR_NAME_NOT_RESOLVED` sur toutes les vidéos dès que le projet n'était plus utilisé.
2. **Centralisation** : Cloudinary était déjà utilisé pour les images produits et les images de blog. Migrer les vidéos vers Cloudinary unifie le stockage sur une seule plateforme sans risque de mise en pause.

Toutes les vidéos ont été uploadées manuellement sur Cloudinary et les URLs en base de données MongoDB ont été mises à jour via le script `BackEnd/src/scripts/migrateVideosToCloudinary.js`.
