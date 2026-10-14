import type { Metadata } from 'next';
import { ProjectList } from '@/components/blocks/project-list';
import { PageFrame } from '@/components/workspace/page-frame';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Case studies: TrackNab, Superfast5G, StockTrack and more, with stack and links.',
};

export default function ProjectsPage() {
  return (
    <PageFrame
      path="projects/"
      title="Projects"
      intro="Ordered by engineering depth. Each one opens into a case study: the problem, my part, what's inside and the stack."
      command="ls projects"
    >
      <ProjectList />
    </PageFrame>
  );
}
