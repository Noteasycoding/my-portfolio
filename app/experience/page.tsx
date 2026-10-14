import type { Metadata } from 'next';
import { Timeline } from '@/components/blocks/timeline';
import { PageFrame } from '@/components/workspace/page-frame';
import { ExternalLink } from '@/components/blocks/run-link';
import { profile } from '@/content/profile';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Software engineering at TrackNab, freelance development, web content at Collegedunia and a Python internship.',
};

export default function ExperiencePage() {
  return (
    <PageFrame
      path="experience.log"
      title="Experience"
      intro="Newest first, like a git log. The current role sits at HEAD."
      command="cat experience.log"
    >
      <Timeline />
      <p className="mt-10 text-body">
        <ExternalLink href={profile.links.resume} className="link-ink">
          Download the full resume ↓
        </ExternalLink>
      </p>
    </PageFrame>
  );
}
