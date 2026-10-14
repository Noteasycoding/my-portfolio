'use client';

import { getProject } from '@/content/projects';
import { ExternalLink, RunLink } from './run-link';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
      <dt className="font-mono text-meta text-muted-foreground sm:pt-1">{label}</dt>
      <dd className="min-w-0 text-body">{children}</dd>
    </div>
  );
}

export function ProjectCaseStudy({ slug, headingLevel = 'h3' }: { slug: string; headingLevel?: 'h1' | 'h3' }) {
  const p = getProject(slug);
  if (!p) return <p className="text-muted-foreground">No project called “{slug}”.</p>;
  const Heading = headingLevel;

  const links = [
    p.links.store && { href: p.links.store, label: 'Google Play' },
    p.links.live && { href: p.links.live, label: 'Live site' },
    p.links.repo && { href: p.links.repo, label: 'Source on GitHub' },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <article>
      <header>
        {headingLevel === 'h3' && <p className="font-mono text-meta text-dim">projects/{p.slug}.md</p>}
        <Heading className={headingLevel === 'h1' ? 'mt-2 text-display' : 'mt-1 text-title font-medium'}>
          {p.name}
        </Heading>
        <p className="mt-3 max-w-[60ch] text-lead">{p.summary}</p>
        <p className="mt-3 flex items-center gap-2 font-mono text-meta text-muted-foreground">
          <span aria-hidden className="inline-block h-1.5 w-1.5 bg-sage" />
          {p.status}
        </p>
      </header>

      {p.image && (
        <figure className="mt-8">
          {/* Remote Play Store artwork; next/image adds nothing with an unoptimized export. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image.src}
            alt={p.image.alt}
            loading="lazy"
            decoding="async"
            className="max-h-[30rem] w-auto max-w-full border"
          />
          <figcaption className="mt-2 font-mono text-meta text-muted-foreground">
            from the Google Play listing
          </figcaption>
        </figure>
      )}

      <dl className="mt-6 border-b">
        <Row label="problem">{p.problem}</Row>
        {p.contribution.length > 0 && (
          <Row label="my part">
            <ul className="space-y-1.5">
              {p.contribution.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden className="font-mono text-dim">
                    –
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Row>
        )}
        <Row label="inside">
          <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
            {p.inside.map((i, idx) => (
              <li key={i}>
                {i}
                {idx < p.inside.length - 1 && <span className="text-dim"> /</span>}
              </li>
            ))}
          </ul>
        </Row>
        <Row label="stack">
          <span className="font-mono text-[14px]">{p.stack.join(' · ')}</span>
        </Row>
        <Row label="links">
          {links.length ? (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <ExternalLink href={l.href} className="link-ink">
                    {l.label} ↗
                  </ExternalLink>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-muted-foreground">
              {p.links.repoPrivate ? 'The source is private.' : 'No public link yet.'}{' '}
              <RunLink command="./contact.sh" href="/contact" className="link-ink text-foreground">
                Ask me about it
              </RunLink>
              .
            </span>
          )}
        </Row>
      </dl>
    </article>
  );
}
