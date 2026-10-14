import type { Metadata } from 'next';
import { SkillMap } from '@/components/blocks/skill-map';
import { PageFrame } from '@/components/workspace/page-frame';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technologies grouped by what they are used for, each linked to the work that uses it.',
};

export default function SkillsPage() {
  return (
    <PageFrame
      path="skills.json"
      title="Skills"
      intro="Grouped by what I use them for, with the work that shows it. No percentages: a bar can't tell you what I've built."
      command="cat skills.json"
    >
      <SkillMap />
    </PageFrame>
  );
}
