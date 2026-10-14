'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Runner = (command: string) => void;

interface WorkspaceValue {
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  /** Run a terminal command: in place on the home page, otherwise by navigating there. */
  run: (command: string) => void;
  /** True while the terminal is mounted and can run commands in place. */
  inTerminal: boolean;
  registerRunner: (runner: Runner | null) => void;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [inTerminal, setInTerminal] = useState(false);
  const runnerRef = useRef<Runner | null>(null);

  const registerRunner = useCallback((runner: Runner | null) => {
    runnerRef.current = runner;
    setInTerminal(Boolean(runner));
  }, []);

  const run = useCallback(
    (command: string) => {
      if (runnerRef.current) runnerRef.current(command);
      else router.push(`/?q=${encodeURIComponent(command)}`);
    },
    [router],
  );

  // ⌘K / Ctrl+K toggles the palette from anywhere, including inside inputs.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey) && !e.altKey) {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(
    () => ({ paletteOpen, setPaletteOpen, run, inTerminal, registerRunner }),
    [paletteOpen, run, inTerminal, registerRunner],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside <WorkspaceProvider>');
  return ctx;
}
