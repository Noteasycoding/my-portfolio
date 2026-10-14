import { projects } from '@/content/projects';
import type { Block } from './types';

export interface Intent {
  id: string;
  /** Exact commands, matched after normalisation. The first one is canonical. */
  commands: string[];
  /** Keyword weights. Multi-word keys match as phrases. */
  keywords: Record<string, number>;
  description: string;
  blocks: Block[];
  next: string[];
}

const projectIntents: Intent[] = projects.map((p) => ({
  id: `project:${p.slug}`,
  commands: [`open ${p.slug}`, `cat projects/${p.slug}.md`, `/${p.slug}`],
  keywords: Object.fromEntries([
    [p.name.toLowerCase(), 4],
    [p.slug, 4],
    ...p.aliases.map((a) => [a, 2]),
  ]),
  description: `Case study: ${p.name}`,
  blocks: [{ type: 'project', slug: p.slug }],
  next: ['ls projects', 'cat skills.json', './contact.sh'],
}));

export const intents: Intent[] = [
  {
    id: 'about',
    commands: ['whoami', 'cat about.md', '/about', 'about'],
    keywords: {
      yourself: 3,
      'who are you': 4,
      'who is': 2,
      introduce: 3,
      introduction: 3,
      background: 2,
      bio: 3,
      zaheer: 1,
      about: 0.5,
    },
    description: 'Who I am and what I work on',
    blocks: [{ type: 'about' }],
    next: ['ls projects', 'cat experience.log', 'cat skills.json'],
  },
  {
    id: 'projects',
    commands: ['ls projects', 'ls projects/', '/projects', 'projects'],
    keywords: {
      project: 2,
      projects: 3,
      built: 2,
      build: 1,
      apps: 2,
      app: 1,
      portfolio: 1,
      'case study': 3,
      'case studies': 3,
      best: 1,
      shipped: 2,
      showcase: 2,
    },
    description: 'Projects, deepest engineering first',
    blocks: [{ type: 'projects' }],
    next: ['open tracknab', 'open superfast5g', 'cat skills.json'],
  },
  ...projectIntents,
  {
    id: 'skills',
    commands: ['cat skills.json', '/skills', 'skills', 'stack'],
    keywords: {
      skills: 3,
      skill: 3,
      stack: 3,
      tech: 3,
      technologies: 3,
      technology: 3,
      languages: 2,
      language: 2,
      tools: 2,
      frameworks: 2,
      react: 1,
      node: 1,
      javascript: 1,
      firebase: 1,
      mongodb: 1,
      'react native': 1,
    },
    description: 'Technologies, grouped by what I use them for',
    blocks: [{ type: 'skills' }],
    next: ['ls projects', 'cat experience.log'],
  },
  {
    id: 'experience',
    commands: ['cat experience.log', 'git log', '/experience', 'experience'],
    keywords: {
      experience: 3,
      career: 3,
      jobs: 3,
      job: 2,
      roles: 2,
      worked: 2,
      companies: 2,
      company: 1,
      history: 2,
      employment: 3,
      timeline: 2,
      tracknab: 0.5,
    },
    description: 'Where I have worked, newest first',
    blocks: [{ type: 'timeline' }],
    next: ['/resume', 'ls projects', './contact.sh'],
  },
  {
    id: 'architecture',
    commands: ['/architecture', 'architecture'],
    keywords: {
      architecture: 4,
      architect: 3,
      system: 2,
      systems: 2,
      design: 1,
      approach: 2,
      scale: 1,
      scalable: 1,
      realtime: 2,
      'real time': 2,
      backend: 1,
    },
    description: 'The shape of the systems I have built',
    blocks: [{ type: 'architecture' }],
    next: ['open tracknab', 'open netflix-clone', 'cat skills.json'],
  },
  {
    id: 'contact',
    commands: ['./contact.sh', 'contact.sh', '/contact', 'contact'],
    keywords: {
      contact: 4,
      email: 3,
      mail: 2,
      hire: 4,
      hiring: 4,
      reach: 3,
      discuss: 3,
      collaborate: 3,
      collaboration: 3,
      talk: 2,
      freelance: 2,
      linkedin: 2,
      github: 2,
      touch: 2,
      "let's": 1,
    },
    description: 'Email, LinkedIn, GitHub',
    blocks: [{ type: 'contact' }],
    next: ['/resume', 'ls projects'],
  },
  {
    id: 'resume',
    commands: ['/resume', 'resume', 'cv', 'open resume.pdf'],
    keywords: { resume: 4, cv: 4, 'résumé': 4, download: 1 },
    description: 'Download my resume',
    blocks: [{ type: 'resume' }],
    next: ['cat experience.log', './contact.sh'],
  },
  {
    id: 'notes',
    commands: ['/notes', 'notes', 'ls notes'],
    keywords: { notes: 3, blog: 4, article: 3, articles: 3, writing: 3, posts: 3 },
    description: 'Engineering notes',
    blocks: [
      {
        type: 'text',
        text: "There are no engineering notes here yet. I'd rather leave this empty than fill it with posts I haven't written. The case studies are the closest thing for now.",
      },
    ],
    next: ['/architecture', 'ls projects'],
  },
  {
    id: 'help',
    commands: ['help', '/help', '?', 'ls', 'man', 'commands'],
    keywords: { help: 4, commands: 3, 'what can': 3, how: 0.5 },
    description: 'Everything this terminal understands',
    blocks: [{ type: 'help' }],
    next: ['whoami', 'ls projects'],
  },
];

/** Not shown as answers; handled by the terminal itself. */
export const CLEAR_COMMANDS = ['clear', '/clear', 'cls', 'reset'];

export const suggestions: { label: string; command: string }[] = [
  { label: 'Tell me about yourself', command: 'whoami' },
  { label: 'Show me your best projects', command: 'ls projects' },
  { label: 'What technologies do you work with?', command: 'cat skills.json' },
  { label: 'How do you approach system architecture?', command: '/architecture' },
  { label: 'Show me your experience', command: 'cat experience.log' },
  { label: "Let's discuss a project", command: './contact.sh' },
];

/** Every exact command, for tab completion. */
export const allCommands = Array.from(
  new Set([...intents.flatMap((i) => i.commands), ...CLEAR_COMMANDS]),
).sort();
