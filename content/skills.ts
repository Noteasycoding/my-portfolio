export interface SkillGroup {
  id: string;
  name: string;
  use: string;
  tools: string[];
  /** Where the group shows up in real work: a project slug, or a labelled external/internal link. */
  evidence: { label: string; href: string }[];
}

export const skills: SkillGroup[] = [
  {
    id: 'mobile',
    name: 'Mobile',
    use: 'Cross-platform apps that ship to real users',
    tools: ['React Native', 'Firebase'],
    evidence: [
      { label: 'TrackNab', href: '/projects/tracknab' },
      { label: 'Superfast5G', href: '/projects/superfast5g' },
      { label: 'StockTrack', href: '/projects/stocktrack' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    use: 'Web interfaces and the state behind them',
    tools: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
    evidence: [
      { label: 'Netflix Clone', href: '/projects/netflix-clone' },
      { label: 'this site', href: 'https://github.com/Noteasycoding/My-portfolio' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    use: 'Servers, auth and integrations with other teams’ APIs',
    tools: ['Node.js', 'Express.js', 'REST APIs'],
    evidence: [
      { label: 'Netflix Clone', href: '/projects/netflix-clone' },
      { label: 'TrackNab', href: '/projects/tracknab' },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    use: 'Document, relational and real-time stores',
    tools: ['MongoDB', 'Firestore', 'Firebase', 'MySQL', 'Prisma'],
    evidence: [
      { label: 'StockTrack', href: '/projects/stocktrack' },
      { label: 'Superfast5G', href: '/projects/superfast5g' },
      { label: 'Netflix Clone', href: '/projects/netflix-clone' },
    ],
  },
  {
    id: 'foundations',
    name: 'Foundations & tooling',
    use: 'Version control, cloud services and the fundamentals',
    tools: ['Git', 'Google Cloud Firebase', 'C++', 'Python'],
    evidence: [
      { label: 'DSA in C++', href: 'https://github.com/Noteasycoding/DSA' },
      {
        label: 'train announcements (Python)',
        href: 'https://github.com/Noteasycoding/Generator-for-train-announcements',
      },
    ],
  },
];
