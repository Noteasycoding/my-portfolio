import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProjectCaseStudy } from '@/components/blocks/project-case-study';
import { PageFrame } from '@/components/workspace/page-frame';
import { getProject, projects } from '@/content/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <PageFrame path={`projects/${p.slug}.md`} title={p.name} command={`open ${p.slug}`} hideTitle>
      <ProjectCaseStudy slug={p.slug} headingLevel="h1" />
      <p className="mt-10 font-mono text-[13px] text-muted-foreground">
        next:{' '}
        <Link href={`/projects/${next.slug}`} className="link-ink text-foreground">
          {next.slug}.md
        </Link>
      </p>
    </PageFrame>
  );
}
