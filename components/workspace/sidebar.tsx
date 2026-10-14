'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profile } from '@/content/profile';
import { cn } from '@/lib/utils';
import { files, isActive, type FileEntry } from './nav';
import { useWorkspace } from './workspace-context';
import { useModKey } from './hooks';

function FileLink({ entry, depth = 0 }: { entry: FileEntry; depth?: number }) {
  const pathname = usePathname();
  const active = isActive(pathname, entry.href);
  const isDir = entry.file.endsWith('/');
  const glyph = entry.href === '/' ? '❯' : isDir ? '▾' : '·';

  return (
    <li>
      <Link
        href={entry.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'group relative flex h-8 items-center gap-2 pr-3 font-mono text-[13px] transition-colors duration-2',
          active ? 'bg-surface text-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
        style={{ paddingLeft: `${16 + depth * 16}px` }}
      >
        <span
          aria-hidden
          className={cn(
            'absolute inset-y-1 left-0 w-[2px] transition-colors duration-2',
            active ? 'bg-signal' : 'bg-transparent',
          )}
        />
        <span aria-hidden className={cn('w-3 text-center', active ? 'text-signal-ink' : 'text-dim')}>
          {glyph}
        </span>
        <span className="truncate">{entry.file}</span>
      </Link>
      {entry.children && (
        <ul>
          {entry.children.map((child) => (
            <FileLink key={child.href} entry={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  const { setPaletteOpen } = useWorkspace();
  const mod = useModKey();

  return (
    <aside className="sticky top-0 hidden h-[calc(100dvh-var(--status-h))] flex-col border-r lg:flex">
      <Link href="/" className="flex items-center gap-3 px-4 pb-5 pt-5">
        <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center bg-signal font-mono text-[13px] font-medium text-signal-foreground">
          zk
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-medium leading-tight">{profile.name}</span>
          <span className="block truncate font-mono text-meta text-muted-foreground">~/{profile.handle}</span>
        </span>
      </Link>

      <nav aria-label="Workspace" className="scrollbar-quiet flex min-h-0 flex-1 flex-col overflow-y-auto">
        <p className="px-4 pb-2 font-mono text-meta text-dim">explorer</p>
        <ul>
          {files.map((entry) => (
            <FileLink key={entry.href} entry={entry} />
          ))}
          <li>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 items-center gap-2 pl-4 pr-3 font-mono text-[13px] text-muted-foreground transition-colors duration-2 hover:text-foreground"
            >
              <span aria-hidden className="w-3 text-center text-dim">
                ↓
              </span>
              resume.pdf
              <span className="sr-only">(downloads from Google Drive)</span>
            </a>
          </li>
        </ul>

        <p className="mt-auto px-4 pb-2 pt-6 font-mono text-meta text-dim">remotes</p>
        <ul className="font-mono text-[13px]">
          {[
            { label: 'github', href: profile.links.github },
            { label: 'linkedin', href: profile.links.linkedin },
            { label: 'email', href: `mailto:${profile.email}` },
          ].map((r) => (
            <li key={r.label}>
              <a
                href={r.href}
                target={r.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex h-8 items-center justify-between px-4 text-muted-foreground transition-colors duration-2 hover:text-foreground"
              >
                <span>
                  <span aria-hidden className="mr-2 text-dim">
                    ↗
                  </span>
                  {r.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="press m-3 flex h-10 items-center justify-between border px-3 text-left font-mono text-[13px] text-muted-foreground transition-colors duration-2 hover:border-border-strong hover:text-foreground"
      >
        <span>command palette</span>
        <span className="flex gap-1">
          <kbd className="kbd">{mod}</kbd>
          <kbd className="kbd">K</kbd>
        </span>
      </button>
    </aside>
  );
}
