'use client';

import { otherWork, projects } from '@/content/projects';
import { ExternalLink, RunLink } from './run-link';

function primaryLink(p: (typeof projects)[number]) {
  if (p.links.store) return { href: p.links.store, label: 'play store' };
  if (p.links.live) return { href: p.links.live, label: 'live' };
  if (p.links.repo) return { href: p.links.repo, label: 'source' };
  return null;
}

export function ProjectList({ showOther = true }: { showOther?: boolean }) {
  return (
    <div>
      <ol className="border-t">
        {projects.map((p) => {
          const link = primaryLink(p);
          return (
            <li key={p.slug} className="group relative border-b">
              <div className="grid gap-x-8 gap-y-2 py-5 transition-colors duration-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-3 sm:group-hover:bg-surface">
                <div className="min-w-0">
                  <h3 className="text-lead font-medium">
                    <RunLink
                      command={`open ${p.slug}`}
                      href={`/projects/${p.slug}`}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none [&:focus-visible]:after:outline [&:focus-visible]:after:outline-2 [&:focus-visible]:after:outline-ring"
                    >
                      {p.name}
                    </RunLink>
                  </h3>
                  <p className="mt-1 max-w-[60ch] text-body">{p.summary}</p>
                  <p className="mt-3 font-mono text-meta text-muted-foreground">
                    <span className="text-sage">{p.kind.toLowerCase()}</span>
                    <span className="text-dim"> · </span>
                    {p.stack.join(' · ')}
                  </p>
                </div>
                <div className="relative z-10 flex items-start gap-4 font-mono text-meta sm:flex-col sm:items-end sm:gap-2 sm:pt-1">
                  <span className="text-muted-foreground transition-colors duration-2 group-hover:text-signal-ink">
                    case study <span aria-hidden>→</span>
                  </span>
                  {link ? (
                    <ExternalLink href={link.href} className="link-ink text-muted-foreground hover:text-foreground">
                      {link.label} ↗
                    </ExternalLink>
                  ) : (
                    <span className="text-dim">{p.links.repoPrivate ? 'source private' : 'no public link'}</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {showOther && (
        <div className="mt-8">
          <p className="font-mono text-meta text-dim">also on github</p>
          <ul className="mt-2">
            {otherWork.map((w) => (
              <li key={w.repo} className="flex flex-wrap items-baseline gap-x-3 py-1.5">
                <ExternalLink href={w.repo} className="link-ink font-mono text-[14px]">
                  {w.name}
                </ExternalLink>
                <span className="font-mono text-meta text-sage">{w.language}</span>
                <span className="text-[15px] text-muted-foreground">{w.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
