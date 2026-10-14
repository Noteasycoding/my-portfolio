'use client';

import type { Block } from '@/lib/assistant/types';
import { ProjectCaseStudy } from './project-case-study';
import { ProjectList } from './project-list';
import { SkillMap } from './skill-map';
import { Timeline } from './timeline';
import { Contact } from './contact';
import { About, Architecture, Fallback, Help, Resume } from './misc';

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return <p className="max-w-[62ch] text-body">{block.text}</p>;
    case 'about':
      return <About />;
    case 'projects':
      return <ProjectList />;
    case 'project':
      return <ProjectCaseStudy slug={block.slug} />;
    case 'timeline':
      return <Timeline />;
    case 'skills':
      return <SkillMap />;
    case 'architecture':
      return <Architecture />;
    case 'contact':
      return <Contact />;
    case 'resume':
      return <Resume />;
    case 'help':
      return <Help />;
    case 'fallback':
      return <Fallback query={block.query} />;
  }
}
