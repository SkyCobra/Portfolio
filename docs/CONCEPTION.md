# Conception — notes techniques

Repères pour reprendre le projet après une pause. Ce qui est écrit ici, c'est ce
qui **ne se devine pas** en lisant le code : les raisons, les valeurs mesurées,
et les pièges déjà rencontrés.

---

## 1. Architecture

Un seul site sur le domaine `skycobra-studio.com`, pas deux. La présentation
freelance et le portfolio partagent la même racine — séparer les deux aurait
coupé le référencement en deux et doublé la maintenance.

```
/                    accueil freelance          (sobre)
/projets             tableau de quêtes          (thème plein)
/a-propos            parcours, approche
/en/…                miroir anglais complet
```

Astro, TypeScript strict, CSS simple. `base: '/'` — le domaine sert à la racine,
il n'y a plus de sous-chemin.

**Hébergeur : non tranché.** GitHub Pages a été abandonné (pas d'en-têtes HTTP
donc pas de CSP, pas d'aperçu par branche, pas de COOP/COEP pour du WebGL
multithread). Le dépôt reste sur GitHub. Les fichiers `public/.htaccess`,
`garde.html` et `maintenance.html` visent un hébergement Apache type OVH.

**Les jeux restent sur itch.io.** Un build WebGL pèse 15 à 60 Mo ; en héberger
quinze saturerait n'importe quelle offre statique, et on perdrait les compteurs
de vues et les pages de jam, qui sont du signal crédible.

---

## 2. Le système de thème

La lanterne bascule `data-theme` sur `<html>`. **Aucun composant ne doit écrire
une couleur en dur** — elle resterait figée sur un thème. Tout passe par les
jetons de `src/styles/global.css`.

Un script en ligne dans le `<head>` pose le thème **avant le premier rendu**,
sinon on verrait la nuit une fraction de seconde avant que le jour s'installe.
Il lit `localStorage`, à défaut suit `prefers-color-scheme`, et retombe
silencieusement sur la nuit si `localStorage` est inaccessible.

### Jetons à connaître

| Jeton | Rôle |
|---|---|
| `--scrim` | Voile entre décor et contenu — **valeur mesurée, pas choisie** |
| `--halo-fort` / `--halo-doux` | Détachement du texte. Ombre noire la nuit, **halo clair** le jour |
| `--accent-on-bg` | Accent posé à même le décor. Crème la nuit, or foncé le jour |
| `--nav-scrim` | Voile sous la navigation, **uniquement en mode jour** |
| `--plaque-*` | La plaque du tableau, thème complet |
| `--feu` | `1` lanterne allumée, `0` éteinte. Pilote flamme, lueur, bloom, halo |

---

## 3. Valeurs mesurées

Aucune opacité de voile n'a été choisie à l'œil. Toutes viennent d'un calcul de
contraste sur l'image réelle, au pire endroit de la zone concernée.

| Zone | Nuit | Jour |
|---|---|---|
| Mur (contenu) | aucun voile — 7,8:1 | crème 15 % — 4,8:1 |
| Poutre (navigation) | aucun voile — 11,9:1 | **sombre 62→40 %** — 8,7:1 |
| Panneau `.stone-panel` | 8,4:1 titre / 7,1:1 texte | 12:1 / 7,4:1 |
| Plaque | 15:1 titre | 7,6:1 titre |

### Le cas de la navigation

C'est le piège le moins évident. La navigation n'est **pas** sur le mur, elle est
sur la **poutre**. Le jour, cette poutre est un **ton moyen** (luminance 0,232) :

- texte clair dessus → 2,1:1
- texte sombre dessus → 2,3:1

**Aucune couleur de texte ne peut fonctionner.** Il faut agir sur le fond. D'où
le voile `--nav-scrim`, actif seulement le jour, et le choix de garder le texte
de la nav **clair dans les deux thèmes** — la poutre est en bois, elle est sombre
par nature.

---

## 4. Le décor

Deux images, `public/fond-nuit.webp` et `public/fond-jour.webp`, portées par un
`body::before` **fixé au viewport** — et non par `background-attachment: fixed`,
qu'iOS Safari gère mal. Conséquence utile : la surface à rastériser reste celle
de l'écran, et le rendu ne dépend plus de la hauteur de la page.

> **Le piège d'origine.** L'ancien fond était un empilement de 40 dégradés CSS
> dont les nœuds étaient positionnés en **pourcentage**. Le même mur s'affichait
> donc différemment sur chaque page : sur `/projets` (1738 px) un nœud déclaré à
> 82 % tombait à y=1425, sur `/a-propos` (772 px) à y=633. Une image fixée au
> viewport supprime le problème par construction.

### La nuit est DÉRIVÉE du jour

Générer les deux ambiances séparément les faisait diverger : même graine, mais
des `style_suffix` opposés suffisent à changer toute la trajectoire de
débruitage. Mesuré par corrélation des cartes de contours :

| | Correspondance structurelle |
|---|---|
| Générées séparément | **31,5 %** |
| Nuit dérivée du jour | **90,3 %** |

La nuit est donc produite **par édition guidée** à partir de l'image de jour
(`recipes/view_flux2_klein_edit.api.json` dans Forge) : seule la lumière change,
la structure est conservée en entrée. Script : `nuit_depuis_jour.py`.

Contrepartie : une nuit dérivée d'une image claire lit « crépuscule ». D'où le
voile noir de 20 %, qui la ramène vers la nuit et remonte le contraste.

---

## 5. La lanterne

Un `<button>` fixe en haut à droite, sous la navigation — sur écran large elle
tombe dans la marge, hors du contenu limité à 1180 px.

- **Le corps** est une image détourée (`public/lanterne.webp`, 246×420). Son
  globe est **translucide à 10 %**, ce qui laisse passer la flamme.
- **La flamme** est une couche CSS **derrière** le corps, ancrée par le bas
  (`transform-origin: bottom center`) sur la mèche relevée à **73,1 %** de la
  hauteur. Elle danse par la pointe, sa base ne bouge pas.
- **Le bloom** est devant le corps, en fusion additive : un objet posé derrière
  une vitre n'a aucune raison de la faire briller.
- **La chaîne** est un masque SVG répété, pas une image — sa couleur vient du
  jeton, donc elle suit le thème.

### Les durées d'animation

**3,4 s** pour la flamme, **4,1 s** pour la lueur, **4,7 s** pour le halo.
Volontairement non multiples : les cycles ne se resynchronisent jamais, sans
quoi le vacillement paraîtrait mécanique. Tout est coupé sous
`prefers-reduced-motion` — le vacillement est un agrément, jamais une
information.

### Gamut

Les quatre couches lumineuses ont une version `display-p3` sous `@supports`, avec
les règles sRGB en repli. Le vrai HDR n'est pas exploitable de façon fiable en
CSS ; display-p3 l'est, et les oranges saturés d'une flamme en profitent
nettement.

---

## 6. Pipeline des visuels

Les images viennent de **Forge** (`D:/Projects/Forge`), profil `skycobra-site`.

| Catégorie | Usage |
|---|---|
| `background_scene_anime` | Décor nocturne |
| `background_scene_anime_day` | Décor diurne |
| `object_cutout` | Objets à détourer, fond blanc plat |
| `social_card_anime` | Bannière Open Graph |

**Détourage** : Flux ne produit pas de canal alpha. Le fond est reconnu par deux
conditions simultanées — très clair **et** très désaturé. C'est la seconde qui
protège la flamme, vive mais franchement jaune, là où un blanc de fond est
neutre. Scripts dans le dossier de travail : `lanternes2.py`, `lanterne_verre.py`.

**Leçon de prompt** : les modèles de diffusion **suivent mal les négations**.
« no wires » a été ignoré cinq fois ; « a perfectly smooth uninterrupted
surface » a fonctionné. Décrire ce qu'on veut, pas ce qu'on refuse.

---

## 7. Pièges rencontrés

**Le serveur de développement ne recompile pas les styles scopés.** Modifier le
`<style>` d'un composant Astro ne se propage pas en rechargement à chaud dans
cette configuration — les jetons globaux passent, pas les règles internes. La
production est correcte. Si un changement ne prend pas : redémarrer le serveur.

**Les transitions faussent toute mesure synchrone.** Lire une couleur juste après
avoir changé `data-theme` renvoie la valeur **de départ**, la transition de 550 ms
étant en cours. Il faut neutraliser les transitions le temps de mesurer.

**Le point d'échantillonnage compte plus que le calcul.** Trois mesures fausses
d'affilée venaient toutes de l'endroit choisi, jamais de la formule : la zone de
contenu au lieu de la zone réelle, une transition en cours, le mur au lieu de la
poutre.

**Attention au faux texte.** Une génération de fond avait fait apparaître
« F.AULIW » au milieu du mur. Le `no text` du style ne suffit pas — il faut
l'affirmation positive : « completely bare and unmarked ».

---

## 8. Ce qui reste

- **Textes** — tout est vidé, marqueurs `[À RÉDIGER]` visibles. Rien d'inventé ne
  doit partir en ligne.
- **Adresse e-mail** — `SITE.email` est un marqueur, à renseigner.
- **Vignettes des 15 jeux** — Cloudflare bloque tout accès automatisé aux pages
  itch.io (403 sur Node, curl, PowerShell et WebFetch). Piste non essayée :
  extraction via un vrai navigateur.
- **Bannière OG** — montre encore la ruine, décor abandonné. À régénérer en salle
  de guilde.
- **Pages projet** `/projets/[slug]` — routes dynamiques et content collections,
  pour rédiger les études de cas en Markdown.
- **Hébergeur** — à trancher.
