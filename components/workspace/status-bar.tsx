'use client';

import { useTheme } from 'next-themes';
import { profile } from '@/content/profile';
import { intentCount } from '@/lib/assistant/local-responder';
import { useMounted, useReducedMotion, useModKey } from './hooks';
import { useWorkspace } from './workspace-context';

const commit = process.env.NEXT_PUBLIC_BUILD_COMMIT;
const branch = process.env.NEXT_PUBLIC_BUILD_BRANCH;
const built = process.env.NEXT_PUBLIC_BUILD_DATE;

export function StatusBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const mod = useModKey();
  const { setPaletteOpen } = useWorkspace();
  const theme = mounted ? resolvedTheme : undefined;

  return (
    <footer
      aria-label="Status bar"
      className="fixed inset-x-0 bottom-0 z-30 hidden h-[var(--status-h)] items-center justify-between border-t bg-surface px-3 font-mono text-[11px] text-muted-foreground lg:flex"
    >
      <div className="flex items-center gap-4">
        {branch && (
          <span title="Git branch this build came from">
            <span aria-hidden className="text-signal-ink">
              ⎇
            </span>{' '}
            {branch}
          </span>
        )}
        {commit && (
          <a
            href={profile.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-2 hover:text-foreground"
            title="This site's source on GitHub"
          >
            {commit}
            <span className="sr-only"> (view this site&apos;s source on GitHub)</span>
          </a>
        )}
        {built && <span>built {built}</span>}
      </div>

      <div className="flex items-center gap-4">
        <span title="How the terminal answers: exact commands and keyword matching over this site's content">
          <span aria-hidden className="text-sage">
            ●
          </span>{' '}
          {intentCount} intents · keyword router
        </span>
        <span>motion: {reduced ? 'reduced' : 'full'}</span>
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="transition-colors duration-2 hover:text-foreground"
          aria-label={theme ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Switch theme'}
        >
          theme: {theme ?? '…'}
        </button>
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="transition-colors duration-2 hover:text-foreground"
        >
          {mod}K
          <span className="sr-only"> open command palette</span>
        </button>
      </div>
    </footer>
  );
}
