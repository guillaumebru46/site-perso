# Site de Guillaume Bru

Site statique : `index.html`, `voyages.html`, `activite.html`, `site.css` et `app.js` à la racine ; images et polices dans `assets/`.

## Publication

Dans **Settings → Pages**, choisir **Deploy from a branch**, la branche `main` et le dossier `/ (root)`.

Les pages autorisent désormais l’indexation. Adresse publique : **https://guillaumebru.com**. Les adresses de référence, l’image de partage (`assets/og-card.jpg`, 1200 × 630), `sitemap.xml` et `robots.txt` pointent vers ce domaine. Le domaine se relie dans **Settings → Pages → Custom domain**. Ne pas utiliser `noindex` comme protection d’accès : ce site ne comporte aucune authentification.

Les contacts ouvrent WhatsApp, Calendly ou Instagram. Aucun formulaire, outil de mesure d’audience, cookie de session ou jeton applicatif n’est géré par le site.

## Animations

`app.js` ajoute des animations discrètes : titres révélés ligne par ligne, apparitions au défilement, photos dévoilées en rideau, compteur du comparatif, en-tête qui s’affine. Elles ne se jouent qu’une fois et sont désactivées quand le visiteur a choisi « réduire les animations ». Sans JavaScript, tout le contenu reste visible.
