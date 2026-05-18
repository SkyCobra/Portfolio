# Portfolio — SkyCobra

Site vitrine personnel listant mes projets de jeux. Une page unique, style tableau de quêtes de guilde, avec mes jeux Itch.io regroupés par catégorie (étudiants, gamejams, publiés).

Construit avec [Astro](https://astro.build) en site statique, déployé sur GitHub Pages.

## Prérequis

- Node.js 22+ (LTS)

## Développement local

```sh
npm install
npm run dev
```

Ouvre `http://localhost:4321/Portfolio/`.

## Build de production

```sh
npm run build
```

Sortie dans `dist/`.

## Commandes utiles

| Commande                  | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `npm run dev`             | Serveur de développement                           |
| `npm run build`           | Build statique vers `dist/`                        |
| `npm run preview`         | Aperçu du build de production en local             |
| `npm run scrape:thumbs`   | Télécharge les jaquettes dans `public/games/`      |

## Structure

```
src/
├── components/   # Composants Astro (header, cartes, etc.)
├── data/         # Données des jeux, i18n, manifest des jaquettes
├── layouts/      # Layout HTML principal
├── pages/        # Routes : / (FR) et /en/
└── styles/       # CSS global et tokens de design
public/
└── games/        # Jaquettes des jeux (id.png|jpg|webp)
scripts/
└── scrape-itch-thumbs.mjs       # Récupère les jaquettes des jeux
```

## Jaquettes des jeux

Les images doivent être placées dans `public/games/` avec un nom de fichier
correspondant à l'`id` du jeu défini dans `src/data/portfolio.ts`.

Le script `npm run scrape:thumbs` automatise le téléchargement depuis Itch.io ;
en cas d'échec (Cloudflare bloque souvent les requêtes datacenter), récupérer
les images manuellement depuis chaque fiche Itch et les déposer dans le dossier.

## Déploiement

Le push sur la branche `main` déclenche [le workflow GitHub Actions](.github/workflows/deploy.yml)
qui build le site et le déploie sur GitHub Pages.

Configuration requise une seule fois : **Settings → Pages → Source = GitHub Actions**.

URL finale : `https://skycobra.github.io/Portfolio/`.

## Langues

Site bilingue FR/EN. Routes :

- `/` — Français (par défaut)
- `/en/` — English

Les chaînes traduites vivent dans `src/data/portfolio.ts` (objet `I18N`).

## Licence

Code sous licence MIT. Le contenu (textes, données des jeux) reste personnel.
