# Site de Guillaume Bru

Site statique : `index.html`, `voyages.html`, `activite.html`, `site.css` et `app.js` à la racine ; images et polices dans `assets/`.

## Publication

Dans **Settings → Pages**, choisir **Deploy from a branch**, la branche `main` et le dossier `/ (root)`.

Les pages autorisent désormais l’indexation. L’image de partage est prête (`assets/og-card.jpg`, 1200 × 630) : une fois l’adresse publique fixée, remplacer `content="assets/og-card.jpg"` par l’URL absolue dans les balises `og:image` des trois pages, car WhatsApp, Facebook et LinkedIn n’acceptent que les adresses complètes. Vérifier l’adresse publique définitive avant d’ajouter les URL canoniques, le sitemap et les métadonnées sociales absolues. Ne pas utiliser `noindex` comme protection d’accès : ce site ne comporte aucune authentification.

Les contacts ouvrent WhatsApp, Calendly ou Instagram. Aucun formulaire, outil de mesure d’audience, cookie de session ou jeton applicatif n’est géré par le site.

## Animations

`app.js` ajoute des animations discrètes : titres révélés ligne par ligne, apparitions au défilement, photos dévoilées en rideau, compteur du comparatif, en-tête qui s’affine. Elles ne se jouent qu’une fois et sont désactivées quand le visiteur a choisi « réduire les animations ». Sans JavaScript, tout le contenu reste visible.
