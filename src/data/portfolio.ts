export type Lang = 'fr' | 'en';
export type Rank = 'Apprenti' | 'Compagnon' | 'Maître';
export type GenreKey =
  | 'fight' | 'tavern' | 'dungeon' | 'rpg' | 'vr'
  | 'arcade' | 'platformer' | 'survival' | 'puzzle';
export type SectionKey = 'students' | 'gamejams' | 'published';
export type AccentKey = 'or' | 'emeraude' | 'rubis' | 'amethyste';

export interface Game {
  id: string;
  title: string;
  itch: string;
  studio: string | null;
  genre: GenreKey;
  year: number;
  platform: string;
  tagFr: string;
  tagEn: string;
  roleFr: string;
  roleEn: string;
  tools: string[];
  rank: Rank;
}

export const ACCENTS: Record<AccentKey, { id: AccentKey; nameFr: string; nameEn: string; hex: string; deep: string; soft: string; wax: string }> = {
  or:        { id: 'or',        nameFr: 'Or',        nameEn: 'Gold',     hex: '#b48a2c', deep: '#6f521a', soft: '#ecdaa7', wax: '#a8782a' },
  emeraude:  { id: 'emeraude',  nameFr: 'Émeraude',  nameEn: 'Emerald',  hex: '#3a7a52', deep: '#1f4a30', soft: '#c3dec8', wax: '#3a7a52' },
  rubis:     { id: 'rubis',     nameFr: 'Rubis',     nameEn: 'Ruby',     hex: '#9a3422', deep: '#5e1d12', soft: '#e9c4b9', wax: '#9a3422' },
  amethyste: { id: 'amethyste', nameFr: 'Améthyste', nameEn: 'Amethyst', hex: '#6f4a8c', deep: '#3f274f', soft: '#d6c4e0', wax: '#6f4a8c' },
};

export const DEFAULT_ACCENT: AccentKey = 'or';

export const I18N = {
  fr: {
    title: 'SkyCobra',
    subtitle: 'Portfolio · Développeur XR & Jeu Vidéo',
    pitch: 'Développeur XR français, diplômé d’Epitech. Bientôt 10 ans à façonner des mondes immersifs et oniriques — du 2D à la VR, en passant par les game jams.',
    sections: {
      students:  { name: 'Projets Étudiants',  motto: 'Premiers parchemins' },
      gamejams:  { name: 'Projets Gamejam',    motto: 'Forgés en quelques jours' },
      published: { name: 'Projets Publiés',    motto: 'Aventures à venir' },
    },
    stats: { years: "Années d'XP", games: 'Jeux livrés', jams: 'Jams', vr: 'Projets VR' },
    spec: { year: 'Année', platform: 'Plateforme', genre: 'Genre', role: 'Rôle', studio: 'Studio', tools: 'Outils' },
    soloAuthor: 'Solo',
    open: 'Ouvrir',
    itch: 'Voir sur Itch.io',
    emptyTitle: 'Aucune quête achevée',
    emptyBody: 'Les prochaines aventures s’écrivent. Reviens bientôt — un grand parchemin attend d’être déroulé ici.',
    langToggle: 'EN',
    home: {
      // Hierarchy: the brand is already in the nav and the role is in the
      // kicker, so the title carries the name. A short H1 also stops the hero
      // wrapping onto three lines at 52px, which flattened everything below it.
      heroKicker: 'Développeur indépendant · XR & jeu vidéo',
      heroTitle: 'Romain Castel',
      heroBody:
        'Je développe des expériences immersives, de la simulation métier au jeu. Bientôt dix ans sur Unity, dont plusieurs années sur des simulateurs de formation en réalité virtuelle — aujourd’hui à mon compte, et ouvert aux projets qui demandent autant de rigueur technique que de soin apporté au ressenti.',
      ctaProjects: 'Voir les projets',
      ctaContact: 'Me contacter',
      servicesTitle: 'Ce que je fais',
      servicesLead: 'Trois manières d’intervenir, selon le besoin.',
      currentTitle: 'En ce moment',
      proTitle: 'Travaux professionnels',
      proLead: 'Réalisations menées en contexte client.',
      featuredTitle: 'Projets marquants',
      featuredLead: 'Trois projets, trois compétences différentes.',
      allProjects: 'Tous les projets',
      contactTitle: 'Un projet, une question ?',
      contactBody:
        'Écrivez-moi en quelques lignes : le contexte, et l’échéance si vous en avez une. Je réponds sous 48 heures — même quand c’est pour dire que ce n’est pas pour moi.',
      contactEmail: 'Envoyer un e-mail',
      rights: 'Tous droits réservés.',
    },
    about: {
      title: 'À propos',
      lead:
        'Je m’appelle Romain Castel. Je développe des jeux et des applications immersives depuis bientôt dix ans, aujourd’hui à mon compte sous le nom SkyCobra Studio.',
      pathTitle: 'Parcours',
      // ⚠️ Two facts still missing: graduation year and the Mimbus period.
      pathBody:
        'Diplômé d’Epitech en [ANNÉE], j’ai passé [PÉRIODE] à développer des simulateurs de formation en réalité virtuelle avant de me lancer en indépendant. Entre-temps, une quinzaine de jeux — projets étudiants, game jams, prototypes personnels — qui m’ont appris à livrer vite sans sacrifier la finition.',
      skillsTitle: 'Compétences',
      approachTitle: 'Façon de travailler',
      approachBody:
        'Je préfère montrer un prototype jouable qu’un document de spécifications. Tester tôt, sur le casque quand il s’agit de VR, corriger, recommencer : c’est ce qui évite les mauvaises surprises en fin de production.',
    },
  },
  en: {
    title: 'SkyCobra',
    subtitle: 'Portfolio · XR & Game Developer',
    pitch: 'French XR developer, Epitech graduate. Nearly a decade shaping immersive, dreamlike worlds — from 2D to VR, with a serious game-jam habit.',
    sections: {
      students:  { name: 'Student Projects', motto: 'First scrolls' },
      gamejams:  { name: 'Gamejam Projects', motto: 'Forged in days' },
      published: { name: 'Published Works',  motto: 'Adventures to come' },
    },
    stats: { years: 'Years XP', games: 'Shipped', jams: 'Jams', vr: 'VR projects' },
    spec: { year: 'Year', platform: 'Platform', genre: 'Genre', role: 'Role', studio: 'Studio', tools: 'Tools' },
    soloAuthor: 'Solo',
    open: 'Open',
    itch: 'See on Itch.io',
    emptyTitle: 'No quest completed yet',
    emptyBody: 'New adventures are being written. Check back soon — a grand scroll waits to be unrolled here.',
    langToggle: 'FR',
    home: {
      heroKicker: 'Independent developer · XR & games',
      heroTitle: 'Romain Castel',
      heroBody:
        'I build immersive experiences, from vocational simulation to games. Nearly ten years in Unity, several of them on virtual reality training simulators — now independent, and open to projects that demand as much technical rigour as care for how they feel.',
      ctaProjects: 'See the projects',
      ctaContact: 'Get in touch',
      servicesTitle: 'What I do',
      servicesLead: 'Three ways to step in, depending on the need.',
      currentTitle: 'Currently building',
      proTitle: 'Professional work',
      proLead: 'Projects delivered in a client context.',
      featuredTitle: 'Selected projects',
      featuredLead: 'Three projects, three different skills.',
      allProjects: 'All projects',
      contactTitle: 'A project, a question?',
      contactBody:
        'Send me a few lines: the context, and the deadline if you have one. I reply within 48 hours — including when the answer is that I am not the right fit.',
      contactEmail: 'Send an email',
      rights: 'All rights reserved.',
    },
    about: {
      title: 'About',
      lead:
        'My name is Romain Castel. I have been building games and immersive applications for nearly ten years, now independently under the name SkyCobra Studio.',
      pathTitle: 'Background',
      // ⚠️ Two facts still missing: graduation year and the Mimbus period.
      pathBody:
        'An Epitech graduate in [YEAR], I spent [PERIOD] building virtual reality training simulators before going independent. Along the way, some fifteen games — student projects, game jams, personal prototypes — taught me to ship fast without cutting corners on polish.',
      skillsTitle: 'Skills',
      approachTitle: 'How I work',
      approachBody:
        'I would rather show a playable prototype than a specification document. Test early, on the headset when it is VR, fix, repeat — that is what keeps the nasty surprises out of late production.',
    },
  },
} as const;

export const GENRES: Record<GenreKey, { fr: string; en: string; glyph: GenreGlyphKind }> = {
  fight:      { fr: 'Combat',             en: 'Combat',               glyph: 'swords' },
  tavern:     { fr: 'Gestion · Potions',  en: 'Management · Potions', glyph: 'mug' },
  dungeon:    { fr: 'Donjon',             en: 'Dungeon',              glyph: 'arch' },
  rpg:        { fr: 'Narratif',           en: 'Narrative',            glyph: 'scroll' },
  vr:         { fr: 'Aventure VR',        en: 'VR Adventure',         glyph: 'visor' },
  arcade:     { fr: 'Arcade',             en: 'Arcade',               glyph: 'star' },
  platformer: { fr: 'Plateforme',         en: 'Platformer',           glyph: 'star' },
  survival:   { fr: 'Survie',             en: 'Survival',             glyph: 'scroll' },
  puzzle:     { fr: 'Puzzle',             en: 'Puzzle',               glyph: 'arch' },
};

export type GenreGlyphKind = 'swords' | 'mug' | 'arch' | 'scroll' | 'visor' | 'star';

export const PROFILE = {
  handle: 'SkyCobra',
  twitter: '@SkyC0bra',
  className: { fr: 'Développeur XR · Unity / VR', en: 'XR Developer · Unity / VR' },
  guild: { fr: 'Diplômé d’Epitech', en: 'Epitech graduate' },
  stats: { years: 9, games: 15, jams: 11, vr: 3 },
} as const;

/* ────────────────────────────────────────────────────────────────────────────
   Site-level identity, navigation and commercial content.
   The portfolio is now one section of a freelance site, so everything below
   describes the studio rather than the game collection.
   ──────────────────────────────────────────────────────────────────────────── */

export const SITE = {
  name: 'SkyCobra Studio',
  owner: 'Romain Castel',
  domain: 'skycobra-studio.com',
  // ⚠️ NOT CONFIRMED — inferred from the OVH MX records. Must be replaced.
  email: '[À RENSEIGNER — adresse e-mail]',
  linkedin: 'https://www.linkedin.com/in/romain-castel/',
  github: 'https://github.com/SkyCobra',
  itch: 'https://skycobra.itch.io',
  twitter: '@SkyC0bra',
} as const;

export interface NavItem {
  href: string;
  labelFr: string;
  labelEn: string;
}

/** Paths are language-prefixed at render time by `localizeHref`. */
export const NAV: NavItem[] = [
  { href: '/projets',  labelFr: 'Projets',  labelEn: 'Projects' },
  { href: '/a-propos', labelFr: 'À propos', labelEn: 'About' },
  // Absolute so it still works from /projets, where there is no contact section.
  { href: '/#contact', labelFr: 'Contact',  labelEn: 'Contact' },
];

/** English routes differ from the French ones, so map them explicitly. */
const EN_ROUTES: Record<string, string> = {
  '/projets': '/en/projects',
  '/a-propos': '/en/about',
};

/** Prefix an internal path with the deploy base.
 *
 *  Production serves from the root, the internal preview from `/Portfolio/`.
 *  Every internal link must go through here, or it 404s on the sub-path.
 */
export function withBase(path: string): string {
  if (path.startsWith('#') || /^[a-z]+:/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;              // '/' or '/Portfolio/'
  return (base.endsWith('/') ? base.slice(0, -1) : base) + path;
}

export function localizeHref(href: string, lang: Lang): string {
  if (href.startsWith('#')) return href;
  const localized = lang === 'fr' ? href : (EN_ROUTES[href] ?? `/en${href}`);
  return withBase(localized);
}

export interface Service {
  id: string;
  titleFr: string;
  titleEn: string;
  bodyFr: string;
  bodyEn: string;
  tools: string[];
}

// The three offerings the owner confirmed. Deliberately NOT included: rapid
// prototyping and taking over existing projects — both were offered and declined,
// so they must not creep back in.
export const SERVICES: Service[] = [
  {
    id: 'xr',
    titleFr: 'Applications XR & VR',
    titleEn: 'XR & VR applications',
    bodyFr:
      'Conception et développement d’applications immersives sur casque — formation, simulation, outils métier. De l’ergonomie des interactions jusqu’au confort en session longue.',
    bodyEn:
      'Design and development of immersive headset applications — training, simulation, internal tools. From interaction ergonomics through to comfort over a long session.',
    tools: ['Unity', 'XR Interaction Toolkit', 'Meta Quest', 'OpenXR'],
  },
  {
    id: 'games',
    titleFr: 'Jeux vidéo',
    titleEn: 'Game development',
    bodyFr:
      'Développement de jeux, du prototype jouable à la version livrée. Systèmes de gameplay, sensations de contrôle, multijoueur.',
    bodyEn:
      'Game development, from playable prototype to shipped build. Gameplay systems, game feel, multiplayer.',
    tools: ['Unity', 'C#', 'Netcode'],
  },
  {
    id: 'team',
    titleFr: 'Renfort d’équipe',
    titleEn: 'Team reinforcement',
    bodyFr:
      'Intégration à une équipe existante, en régie ou en sous-traitance, sur une durée définie. Utile quand il manque une paire de mains expérimentées sur Unity ou sur la partie XR.',
    bodyEn:
      'Joining an existing team, on site or as a subcontractor, for a defined period. Useful when a team is short an experienced pair of hands on Unity or on the XR side.',
    tools: ['Unity', 'Régie', 'Code review'],
  },
];

/** The three games promoted on the home page — each demonstrates a different skill. */
export const FEATURED_IDS = ['yogurt-royale', 'sea-of-dreams', 'dungeon-soul'] as const;

export interface CurrentWork {
  id: string;
  title: string;
  statusFr: string;
  statusEn: string;
  tagFr: string;
  tagEn: string;
  tools: string[];
}

// Title confirmed by the owner; everything else still to be supplied.
export const CURRENT: CurrentWork = {
  id: 'adventure-haven',
  title: 'Adventure Haven',
  statusFr: 'En développement',
  statusEn: 'In development',
  tagFr: '[À RÉDIGER — de quoi parle Adventure Haven ?]',
  tagEn: '[TO WRITE — what is Adventure Haven?]',
  tools: [],
};

export interface ProWork {
  id: string;
  title: string;
  clientFr: string;
  clientEn: string;
  bodyFr: string;
  bodyEn: string;
  tools: string[];
  /** Public YouTube URLs. Empty until Romain supplies them. */
  videos: string[];
}

// ⚠️ Client name confirmed. Wording still to be written — and to be cleared
// with the former employer before anything goes public.
export const PRO: ProWork[] = [
  {
    id: 'mimbus',
    title: '[À RÉDIGER — intitulé des travaux]',
    clientFr: 'Mimbus',
    clientEn: 'Mimbus',
    bodyFr: '[À RÉDIGER — ce que tu as fait, après validation de ton ancien employeur]',
    bodyEn: '[TO WRITE — pending employer approval]',
    tools: [],
    videos: [],
  },
];

export const RANK_PIPS: Record<Rank, number> = {
  Apprenti: 1,
  Compagnon: 2,
  Maître: 3,
};

export const GAMES: Record<SectionKey, Game[]> = {
  students: [
    { id: 'dungeon-soul',   title: 'Dungeon Soul',         itch: 'https://pipapou.itch.io/dungeon-soul',
      studio: 'PIPAPOU', genre: 'dungeon', year: 2021, platform: 'Navigateur · PC',
      tagFr: 'Construis ton donjon, affronte des vagues de héros.',
      tagEn: 'Build your dungeon, fight waves of heroes.',
      roleFr: 'Dev · gameplay', roleEn: 'Dev · gameplay', tools: ['Unity', 'C#'], rank: 'Apprenti' },
    { id: 'yogurt-royale',  title: 'Yogurt Royale',        itch: 'https://lordfinn.itch.io/yogurt-royale',
      studio: 'Yannick Suc', genre: 'fight', year: 2020, platform: 'PC · multijoueur',
      tagFr: 'Plateformer PvP de slimes — attrape toutes les bananes.',
      tagEn: 'Slime PvP platformer — grab all the bananas.',
      roleFr: 'Dev · combat & feel', roleEn: 'Dev · combat & feel', tools: ['Unity', 'C#'], rank: 'Apprenti' },
    { id: 'breath',         title: 'Breath',               itch: 'https://skycobra.itch.io/breath',
      studio: null, genre: 'platformer', year: 2020, platform: 'PC',
      tagFr: 'Garder son calme et respirer pour s’en sortir.',
      tagEn: 'Stay calm and breathe your way out.',
      roleFr: 'Solo dev', roleEn: 'Solo dev', tools: ['Unity', 'C#'], rank: 'Apprenti' },
    { id: 'epic-lolineuh',  title: 'Epic Lolineuh Quest',  itch: 'https://skycobra.itch.io/epic-lolineuh-quest',
      studio: null, genre: 'arcade', year: 2019, platform: 'PC',
      tagFr: 'Une licorne récolte 7 couleurs pour sauver le royaume.',
      tagEn: 'A unicorn collects 7 colors to save the kingdom.',
      roleFr: 'Solo dev', roleEn: 'Solo dev', tools: ['Unity', 'C#'], rank: 'Apprenti' },
  ],

  gamejams: [
    { id: 'sea-of-dreams',     title: 'Sea Of Dreams',     itch: 'https://skycobra.itch.io/sea-of-dreams',
      studio: null, genre: 'survival', year: 2024, platform: 'Navigateur',
      tagFr: 'Fuis le bateau avant d’être dévoré par son habitant monstrueux.',
      tagEn: 'Flee the ship before its monstrous dweller devours you.',
      roleFr: 'Solo · jam', roleEn: 'Solo · jam', tools: ['Unity', 'WebGL'], rank: 'Compagnon' },
    { id: 'mystic-foam',       title: 'The Mystic Foam',   itch: 'https://lunnial.itch.io/the-mystic-foam',
      studio: 'Lunnial', genre: 'tavern', year: 2024, platform: 'PC',
      tagFr: 'Confectionne des potions pétillantes — cultive tes ingrédients.',
      tagEn: 'Craft sparkling potions — grow your own ingredients.',
      roleFr: 'Dev · systèmes', roleEn: 'Dev · systems', tools: ['Unity', 'C#'], rank: 'Compagnon' },
    { id: 'back-to-the-stars', title: 'Back to the Stars', itch: 'https://lunnial.itch.io/back-to-the-stars',
      studio: 'Lunnial', genre: 'platformer', year: 2023, platform: 'Navigateur',
      tagFr: 'Plateformer stellaire — retrouve le chemin des étoiles.',
      tagEn: 'Stellar platformer — find the way back to the stars.',
      roleFr: 'Dev · gameplay', roleEn: 'Dev · gameplay', tools: ['Unity', 'WebGL'], rank: 'Compagnon' },
    { id: 'smallville',        title: 'SmallVille Guardian', itch: 'https://skycobra.itch.io/smallville-guardian',
      studio: null, genre: 'vr', year: 2023, platform: 'VR',
      tagFr: 'Étends ton village et défends les villageois en VR.',
      tagEn: 'Expand your village and defend the villagers — in VR.',
      roleFr: 'Solo XR dev', roleEn: 'Solo XR dev', tools: ['Unity', 'XR Toolkit'], rank: 'Compagnon' },
    { id: 'under',             title: 'Under',             itch: 'https://zirk.itch.io/under',
      studio: 'Zirk', genre: 'puzzle', year: 2022, platform: 'PC',
      tagFr: 'Puzzle addictif aux relents de survie.',
      tagEn: 'Addictive puzzle with survival edges.',
      roleFr: 'Dev', roleEn: 'Dev', tools: ['Unity', 'C#'], rank: 'Compagnon' },
    { id: 'metaarena',         title: 'MetaArena (VR)',    itch: 'https://skycobra.itch.io/metaarena',
      studio: null, genre: 'vr', year: 2022, platform: 'VR',
      tagFr: 'Combats VR — change la forme de ton arme pour t’adapter.',
      tagEn: 'VR combat — reshape your weapon to adapt.',
      roleFr: 'Solo XR dev', roleEn: 'Solo XR dev', tools: ['Unity', 'XR Toolkit'], rank: 'Compagnon' },
    { id: 'out-of-nightmare',  title: 'Out of Nightmare',  itch: 'https://skycobra.itch.io/out-of-nightmare',
      studio: null, genre: 'rpg', year: 2022, platform: 'PC',
      tagFr: 'Échappe à la maison pour quitter le cauchemar.',
      tagEn: 'Escape the house to leave the nightmare.',
      roleFr: 'Solo · jam', roleEn: 'Solo · jam', tools: ['Unity', 'C#'], rank: 'Compagnon' },
    { id: 'brickpong',         title: 'BrickPong 3.0',     itch: 'https://skycobra.itch.io/brickpong-30',
      studio: null, genre: 'arcade', year: 2021, platform: 'Navigateur',
      tagFr: 'Quand Pong rencontre le casse-briques.',
      tagEn: 'When Pong meets brick-breaker.',
      roleFr: 'Solo · jam', roleEn: 'Solo · jam', tools: ['Unity', 'WebGL'], rank: 'Compagnon' },
    { id: 'lostkeyboard',      title: 'LostKeyboard',      itch: 'https://skycobra.itch.io/lostkeyboard',
      studio: null, genre: 'rpg', year: 2021, platform: 'PC',
      tagFr: 'GGJ 2021 — retrouve tes touches de clavier dans le jeu.',
      tagEn: 'GGJ 2021 — find your keyboard keys inside the game.',
      roleFr: 'Solo · GGJ 2021', roleEn: 'Solo · GGJ 2021', tools: ['Unity', 'C#'], rank: 'Compagnon' },
    { id: 'coopmaze',          title: 'CoopMaze',          itch: 'https://skycobra.itch.io/coopmaze',
      studio: null, genre: 'vr', year: 2021, platform: 'VR · coop',
      tagFr: 'Labyrinthe VR sombre — coopère pour trouver le trésor.',
      tagEn: 'Dark VR labyrinth — cooperate to find the treasure.',
      roleFr: 'Solo XR dev', roleEn: 'Solo XR dev', tools: ['Unity', 'XR Toolkit'], rank: 'Compagnon' },
    { id: 'dungeon-master',    title: 'Dungeon Master',    itch: 'https://zirk.itch.io/dungeon-master',
      studio: 'Zirk', genre: 'dungeon', year: 2020, platform: 'Navigateur',
      tagFr: 'Défends ton donjon contre les aventuriers.',
      tagEn: 'Defend your dungeon against adventurers.',
      roleFr: 'Dev · gameplay', roleEn: 'Dev · gameplay', tools: ['Unity', 'WebGL'], rank: 'Compagnon' },
  ],

  published: [],
};

export function getTag(game: Game, lang: Lang): string {
  return lang === 'fr' ? game.tagFr : game.tagEn;
}
export function getRole(game: Game, lang: Lang): string {
  return lang === 'fr' ? game.roleFr : game.roleEn;
}
export function getGenreLabel(genre: GenreKey, lang: Lang): string {
  return GENRES[genre][lang];
}

/** Flat list of every game, regardless of section. */
export function allGames(): Game[] {
  return [...GAMES.students, ...GAMES.gamejams, ...GAMES.published];
}

export function findGame(id: string): Game | undefined {
  return allGames().find((g) => g.id === id);
}

/** The featured games, in the order declared by FEATURED_IDS. */
export function featuredGames(): Game[] {
  return FEATURED_IDS.map(findGame).filter((g): g is Game => Boolean(g));
}
