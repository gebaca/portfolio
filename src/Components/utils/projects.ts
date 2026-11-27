export type LinkKind = 'live' | 'case-study' | 'paper';

export interface ProjectLink {
  kind: LinkKind;
  href: string;
}

// Texto visible de cada tipo de enlace
export const linkLabels: Record<LinkKind, string> = {
  live: 'Live project',
  'case-study': 'Case study',
  paper: 'Paper',
};

/** Proyecto destacado: tarjeta con una imagen o GIF y un enlace opcional. */
export interface ShowcaseProject {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  results?: string;
  image: string; // imagen o GIF
  imageAlt?: string; // si falta, la tarjeta usa "<título> preview"
  poster?: string; // fotograma estático del GIF para prefers-reduced-motion
  link?: ProjectLink;
  stack?: string[];
}

/** Proyecto archivado: una fila de la tabla de /archive. */
export interface ArchivedProject {
  id: number;
  title: string;
  stack: string[];
  url?: string;
}

// ─── Showcase ────────────────────────────────────────────────────────────────

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: 'Threaded',
    subtitle: 'Animation for communication',
    description:
      'A design research project exploring how animation can help users notice and understand permission changes in complex software.\n\nThe paper introduces Threaded, a visual prototype demonstrating how changes in access permissions could be communicated through motion and visual cues.',
    results:
      '8/9 participants noticed the change in the standard interface, compared with 9/9 using Threaded.',
    image: '/proyectos/threaded/Animation-new.gif',
    imageAlt:
      'Threaded prototype: a permission change communicated through motion and visual cues',
    link: {
      kind: 'paper',
      href: 'https://www.youtube.com/watch?v=P027oGJy2n4&list=RDyzCHcqkPbcE&index=13',
    },
  },
  {
    id: 2,
    title: 'Wealth Watcher',
    description:
      'A B2B wealth management dashboard, from case study to working prototype.',
    image: '/proyectos/Wealthwatcher/wealthwatcher.gif',
    link: {
      kind: 'live',
      href: 'https://horizon-wealth-dashboard.vercel.app/',
    },
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
  },
  {
    id: 4,
    title: 'gerardbataller.com(v2)',
    description: 'Previous portfolio website',
    image: '/proyectos/portfolio/portfolio.gif',
    link: {
      kind: 'live',
      href: 'https://gerard-bataller.vercel.app/',
    },
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Figma'],
  },
  {
    id: 3,
    title: 'Football B2B',
    description:
      'A case study on B2B software for football academies: research, product thinking and design.',
    image: '/proyectos/footballB2B/football.gif',
    link: {
      kind: 'case-study',
      href: 'https://app.notion.com/p/SaaS-Football-Academy-3608d03cc89680f3a004ebd86ba23143',
    },
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Figma'],
  },
];

// ─── Archived ────────────────────────────────────────────────────────────────

const EXPERIMENTS_URL = 'https://experiments-tan.vercel.app/experiment';
const EXPERIMENT_STACK = ['React', 'GSAP', 'TypeScript'];

export const archivedProjects: ArchivedProject[] = [
  {
    id: 4,
    title: 'ING Redesign',
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    url: 'https://ing-landing-gerard.vercel.app/',
  },
  {
    id: 5,
    title: 'Hyrulepedia',
    stack: ['React', 'GSAP', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    url: 'https://hyrulepedia.web.app/login',
  },
  {
    id: 6,
    title: 'NEVER LATE',
    stack: ['Unity', 'C#', '3D MAX'],
    url: 'https://potasiogames.itch.io/never-late',
  },
  {
    id: 7,
    title: 'AVENTURA POR VALENCIA',
    stack: ['C#', 'Unity', 'JavaScript'],
    url: 'https://ficiv.org/minijuego/',
  },
  {
    id: 8,
    title: 'Parallax Depth',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/01-depth-color`,
  },
  {
    id: 9,
    title: 'Panel Selector',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/02-panel-selector`,
  },
  {
    id: 10,
    title: 'SVG Draw',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/03-svg-draw`,
  },
  {
    id: 11,
    title: 'Brush Trail',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/04-brush-trail`,
  },
  {
    id: 12,
    title: 'Player Badge',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/05-player-status`,
  },
  {
    id: 13,
    title: 'Timing Panel',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/06-timing-panel`,
  },
  {
    id: 14,
    title: 'Double Stroke',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/07-double-stroke`,
  },
  {
    id: 15,
    title: 'Scroll Parallax',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/08-scroll-parallax`,
  },
  {
    id: 16,
    title: 'Expressive Table',
    stack: EXPERIMENT_STACK,
    url: `${EXPERIMENTS_URL}/10-expressive-table`,
  },
  {
    id: 17,
    title: 'Ray Marching Videogame',
    stack: ['Unity', 'C#', 'C++', 'HLSL'],
    url: 'https://gebaca.itch.io/ciclico',
  },
  {
    id: 18,
    title: 'component animation trilogy',
    stack: ['typescript', 'GSAP', 'FramerMotion'],
    url: 'https://app.notion.com/p/component-animation-trilogy-3778d03cc89680dea806d56069e2376b',
  },
];
