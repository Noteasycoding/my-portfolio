export interface Role {
  title: string;
  company: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  points: string[];
}

export const experience: Role[] = [
  {
    title: 'Software Engineer',
    company: 'TrackNab',
    start: 'Mar 2024',
    end: 'Present',
    current: true,
    location: 'Dubai, UAE (Remote)',
    points: [
      'Developing cross-platform mobile applications using React Native',
      'Improving application performance and state management',
      'Collaborating with backend teams for API integrations',
    ],
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Self-employed',
    start: 'Jul 2023',
    end: 'Mar 2024',
    location: 'Remote',
    points: [
      'Built and deployed multiple React.js applications',
      'Developed full-stack applications using the MERN stack',
    ],
  },
  {
    title: 'Web Content Uploader',
    company: 'Collegedunia',
    start: 'Nov 2022',
    end: 'Mar 2024',
    location: 'Gurugram, India',
    points: ['Managed web content and worked with HTML & CSS'],
  },
  {
    title: 'Python Developer Intern',
    company: 'CETPA Infotech',
    start: 'Jun 2021',
    end: 'Aug 2021',
    location: 'Noida, India',
    points: ['Developed Python applications using OOP principles'],
  },
];
