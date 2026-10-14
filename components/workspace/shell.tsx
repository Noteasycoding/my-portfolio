'use client';

import Link from 'next/link';
import { profile } from '@/content/profile';
import { CommandPalette } from './command-palette';
import { Sidebar } from './sidebar';
import { StatusBar } from './status-bar';
import { WorkspaceProvider, useWorkspace } from './workspace-context';

function MobileBar() {
  const { setPaletteOpen } = useWorkspace();
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b bg-background pl-4 pr-2 lg:hidden">
      <Link href="/" className="flex h-11 items-center font-mono text-[14px]">
        <span aria-hidden className="mr-2 text-signal-ink">
          ❯
        </span>
        ~/{profile.handle}
      </Link>
      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="press flex h-11 items-center gap-2 px-3 font-mono text-[14px] text-muted-foreground"
        aria-haspopup="dialog"
      >
        <span aria-hidden>⌘</span> menu
      </button>
    </header>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-signal focus:px-3 focus:py-2 focus:font-mono focus:text-signal-foreground"
      >
        Skip to content
      </a>
      <div className="lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:pb-[var(--status-h)]">
        <Sidebar />
        <MobileBar />
        <main id="main" className="min-w-0">
          {children}
        </main>
      </div>
      <StatusBar />
      <CommandPalette />
    </WorkspaceProvider>
  );
}
