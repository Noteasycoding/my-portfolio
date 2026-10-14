export type ProjectKind = 'Mobile platform' | 'Mobile app' | 'Web app';

export interface Project {
  slug: string;
  name: string;
  kind: ProjectKind;
  /** One line: what the product does. */
  summary: string;
  /** The problem it addresses, stated from known facts only. */
  problem: string;
  /** What Zaheer did. Empty means "not documented yet" and is not rendered. */
  contribution: string[];
  /** The product's moving parts. */
  inside: string[];
  stack: string[];
  status: string;
  /** Extra words the assistant should match this project by. */
  aliases: string[];
  links: {
    live?: string;
    store?: string;
    repo?: string;
    /** Set when the source exists but is not public. */
    repoPrivate?: boolean;
  };
  image?: { src: string; alt: string };
}

export const projects: Project[] = [
  {
    slug: 'tracknab',
    name: 'TrackNab',
    kind: 'Mobile platform',
    summary:
      'School transport tracking: a parent app and a driver app around live bus tracking, trips and NFC check-in.',
    problem:
      'Gives parents and schools visibility into school transport: where the bus is, which trip is running, and when each student boards or leaves it.',
    // From the TrackNab role on the resume. TODO: add specific features owned.
    contribution: [
      'Developing the cross-platform mobile apps in React Native',
      'Improving application performance and state management',
      'Working with the backend team on API integrations',
    ],
    inside: [
      'Parent app',
      'Driver app',
      'Live bus tracking',
      'Trip management',
      'NFC student check-in and check-out',
    ],
    stack: ['React Native', 'JavaScript', 'REST APIs'],
    status: 'Current work at TrackNab',
    aliases: ['bus', 'school', 'nfc', 'tracking', 'transport', 'driver', 'parent', 'trip'],
    // TODO: add public store or web links when available.
    links: {},
  },
  {
    slug: 'superfast5g',
    name: 'Superfast5G',
    kind: 'Mobile app',
    summary:
      'A live Play Store app where subscribers see their active plan, track data usage and recharge online.',
    problem:
      'Subscribers need their plan, usage and recharges in one place, and the operator needs to manage users and follow recharges.',
    contribution: [
      'Built the mobile app with React Native and Firebase',
      'Built admin controls for user management and recharge tracking',
      'Shipped as a live production app on Google Play',
    ],
    inside: ['Active plan view', 'Data usage tracking', 'Online recharge', 'Admin: users and recharges'],
    stack: ['React Native', 'Firebase'],
    status: 'Live on Google Play',
    aliases: ['superfast', '5g', 'recharge', 'plan', 'data usage', 'play store', 'playstore'],
    links: { store: 'https://play.google.com/store/apps/details?id=com.superfast5g' },
    image: {
      src: 'https://play-lh.googleusercontent.com/f8NgMxdybOu-PMu06zNU26JYOJfwbBlgKqHax61peNVZDC1lhOYGydbv6jSf79tlZA=w1600-h900-rw',
      alt: 'Superfast5G app screens from its Google Play listing',
    },
  },
  {
    slug: 'stocktrack',
    name: 'StockTrack',
    kind: 'Mobile app',
    summary: 'Inventory tracking for businesses: a product catalog, stock-level alerts and a cloud database.',
    problem: 'Businesses need to know what is in stock and hear about it before something runs out.',
    contribution: [
      'Built the inventory tracking app in React Native',
      'Built the product catalog and stock-level alerts',
      'Used Firebase Firestore for real-time database sync',
    ],
    inside: ['Product catalog', 'Stock-level alerts', 'Real-time sync via Firestore'],
    stack: ['React Native', 'Firebase', 'Firestore'],
    status: 'Source is private',
    aliases: ['stock', 'inventory', 'catalog', 'firestore'],
    links: { repoPrivate: true },
  },
  {
    slug: 'netflix-clone',
    name: 'Netflix Clone',
    kind: 'Web app',
    summary: 'A Netflix-style streaming front end on a MERN stack, with authentication and a movie database.',
    problem: 'A full-stack exercise in a familiar product: auth, a content catalog and a responsive UI end to end.',
    contribution: [
      'Built it with React, Node.js, Express and MongoDB',
      'Implemented user authentication with JWT',
      'Managed client state with Redux and built a responsive UI',
    ],
    inside: ['JWT authentication', 'Movie database', 'Responsive UI', 'Redux state'],
    stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    status: 'Source on GitHub',
    aliases: ['netflix', 'streaming', 'mern', 'movie', 'movies', 'clone'],
    links: { repo: 'https://github.com/Noteasycoding/NetflixClone' },
  },
];

export interface MinorWork {
  name: string;
  description: string;
  language: string;
  repo: string;
}

export const otherWork: MinorWork[] = [
  {
    name: 'DSA',
    description: 'Data structures and algorithms, worked through from the basics.',
    language: 'C++',
    repo: 'https://github.com/Noteasycoding/DSA',
  },
  {
    name: 'Generator-for-train-announcements',
    description: 'A tool that produces train announcements with a single click.',
    language: 'Python',
    repo: 'https://github.com/Noteasycoding/Generator-for-train-announcements',
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
