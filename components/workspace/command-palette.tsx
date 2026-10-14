'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { suggestions } from '@/lib/assistant/intents';
import { files } from './nav';
import { useWorkspace } from './workspace-context';

const groupClass =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-meta [&_[cmdk-group-heading]]:text-dim';

function Item({
  children,
  hint,
  onSelect,
  value,
  keywords,
}: {
  children: React.ReactNode;
  hint?: string;
  onSelect: () => void;
  value: string;
  keywords?: string[];
}) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={onSelect}
      className="relative flex min-h-11 cursor-pointer items-center justify-between gap-4 px-3 text-[15px] text-muted-foreground data-[selected=true]:bg-surface data-[selected=true]:text-foreground"
    >
      <span className="truncate">{children}</span>
      {hint && <span className="shrink-0 font-mono text-meta text-dim">{hint}</span>}
    </Command.Item>
  );
}

/**
 * Opened hundreds of times by people who use it, so it has no open/close
 * animation: it appears the moment ⌘K is pressed.
 */
/**
 * Word-prefix matches first, then substrings. cmdk's default fuzzy scoring
 * ranks "Show me your experience" above "Superfast5G" for "super".
 */
function filter(value: string, search: string, keywords?: string[]) {
  const q = search.trim().toLowerCase();
  if (!q) return 1;
  const hay = [value, ...(keywords ?? [])].join(' ').toLowerCase();
  if (hay.split(/[\s/.\-]+/).some((w) => w.startsWith(q))) return 1;
  if (hay.includes(q)) return 0.5;
  return 0;
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, run } = useWorkspace();
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (paletteOpen) returnFocus.current = document.activeElement as HTMLElement | null;
  }, [paletteOpen]);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const close = (then: () => void) => {
    setPaletteOpen(false);
    then();
  };

  const external = (href: string) => window.open(href, '_blank', 'noopener,noreferrer');

  const flatFiles = files.flatMap((f) => [f, ...(f.children ?? [])]).filter((f) => !f.href.startsWith('/projects/'));

  return (
    <Dialog.Root open={paletteOpen} onOpenChange={setPaletteOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/70" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => {
            // Without a Dialog.Trigger, Radix would drop focus on <body>.
            const el = returnFocus.current;
            if (el && document.contains(el) && el !== document.body) {
              e.preventDefault();
              el.focus({ preventScroll: true });
            }
          }}
          className="fixed left-1/2 top-3 z-50 w-[calc(100vw-24px)] max-w-[40rem] -translate-x-1/2 border border-border-strong bg-raised shadow-[0_24px_64px_-16px_rgb(0_0_0/0.5)] focus:outline-none sm:top-[12vh]"
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Command loop filter={filter} className={groupClass}>
            <div className="flex items-center gap-3 border-b px-3">
              <span aria-hidden className="font-mono text-signal-ink">
                ❯
              </span>
              <Command.Input
                autoFocus
                placeholder="Go to a file, ask something, open a link…"
                className="h-12 w-full bg-transparent font-mono text-base outline-none placeholder:text-dim"
              />
              <kbd className="kbd hidden sm:inline-flex">esc</kbd>
            </div>

            <Command.List className="scrollbar-quiet max-h-[min(60dvh,26rem)] overflow-y-auto pb-2">
              <Command.Empty className="px-3 py-6 font-mono text-sm text-muted-foreground">
                No matches. Try “projects”, “email” or “theme”.
              </Command.Empty>

              <Command.Group heading="go to">
                {flatFiles.map((f) => (
                  <Item
                    key={f.href}
                    value={`go ${f.label} ${f.file}`}
                    hint={f.file}
                    onSelect={() => close(() => router.push(f.href))}
                  >
                    {f.label}
                  </Item>
                ))}
              </Command.Group>

              <Command.Group heading="ask the terminal">
                {suggestions.map((s) => (
                  <Item
                    key={s.command}
                    value={`ask ${s.label}`}
                    keywords={[s.command]}
                    hint={s.command}
                    onSelect={() => close(() => run(s.command))}
                  >
                    {s.label}
                  </Item>
                ))}
              </Command.Group>

              <Command.Group heading="projects">
                {projects.map((p) => (
                  <Item
                    key={p.slug}
                    value={`project ${p.name}`}
                    keywords={p.aliases}
                    hint={p.kind.toLowerCase()}
                    onSelect={() => close(() => router.push(`/projects/${p.slug}`))}
                  >
                    {p.name}
                  </Item>
                ))}
              </Command.Group>

              <Command.Group heading="links">
                <Item
                  value="copy email address"
                  hint={profile.email}
                  onSelect={() =>
                    close(() => {
                      navigator.clipboard
                        ?.writeText(profile.email)
                        .then(() => toast.success('Email copied', { description: profile.email }))
                        .catch(() => toast.error('Could not copy. The address is ' + profile.email));
                    })
                  }
                >
                  Copy email address
                </Item>
                <Item
                  value="send email"
                  hint="mailto"
                  onSelect={() => close(() => (window.location.href = `mailto:${profile.email}`))}
                >
                  Send an email
                </Item>
                <Item value="github" hint="↗" onSelect={() => close(() => external(profile.links.github))}>
                  GitHub
                </Item>
                <Item value="linkedin" hint="↗" onSelect={() => close(() => external(profile.links.linkedin))}>
                  LinkedIn
                </Item>
                <Item
                  value="download resume cv"
                  hint="resume.pdf ↓"
                  onSelect={() => close(() => external(profile.links.resume))}
                >
                  Download resume
                </Item>
                <Item
                  value="view source of this site"
                  hint="↗"
                  onSelect={() => close(() => external(profile.links.source))}
                >
                  View this site’s source
                </Item>
              </Command.Group>

              <Command.Group heading="preferences">
                <Item
                  value="toggle theme light dark"
                  hint={resolvedTheme === 'dark' ? 'dark → light' : 'light → dark'}
                  onSelect={() => close(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))}
                >
                  Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} theme
                </Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
