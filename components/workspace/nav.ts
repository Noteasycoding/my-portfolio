import { projects } from '@/content/projects';

export interface FileEntry {
  href: string;
  file: string;
  label: string;
  /** Terminal command that shows the same content in place. */
  command?: string;
  children?: FileEntry[];
}

export const files: FileEntry[] = [
  { href: '/', file: 'terminal', label: 'Terminal' },
  { href: '/about', file: 'about.md', label: 'About', command: 'whoami' },
  {
    href: '/projects',
    file: 'projects/',
    label: 'Projects',
    command: 'ls projects',
    children: projects.map((p) => ({
      href: `/projects/${p.slug}`,
      file: `${p.slug}.md`,
      label: p.name,
      command: `open ${p.slug}`,
    })),
  },
  { href: '/experience', file: 'experience.log', label: 'Experience', command: 'cat experience.log' },
  { href: '/skills', file: 'skills.json', label: 'Skills', command: 'cat skills.json' },
  { href: '/contact', file: 'contact.sh', label: 'Contact', command: './contact.sh' },
];

export function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname === `${href}/`;
}
