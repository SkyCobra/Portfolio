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
