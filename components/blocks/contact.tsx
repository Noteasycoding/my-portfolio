'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/content/profile';
import { ExternalLink } from './run-link';

function CopyButton({ value }: { value: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
    } catch {
      setState('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="press h-8 min-w-[4.5rem] border px-2 font-mono text-meta text-muted-foreground transition-colors duration-2 hover:border-border-strong hover:text-foreground"
    >
      <span aria-live="polite">{state === 'copied' ? 'copied ✓' : state === 'failed' ? 'select it' : 'copy'}</span>
    </button>
  );
}

const rows = [
  {
    key: 'github',
    value: 'github.com/Noteasycoding',
    href: profile.links.github,
  },
  {
    key: 'linkedin',
    value: 'in/zahiruddin-khan',
    href: profile.links.linkedin,
  },
  {
    key: 'resume',
    value: 'resume.pdf',
    href: profile.links.resume,
  },
];

export function Contact() {
  return (
    <div>
      <p className="max-w-[60ch] text-body">
        I&apos;m always open to talking about new projects, ideas and opportunities. Email is the fastest way to reach
        me.
      </p>
      <dl className="mt-5 border-b font-mono text-[14px]">
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-4 border-t py-3 sm:grid-cols-[6rem_minmax(0,1fr)_auto]">
          <dt className="text-muted-foreground">email</dt>
          <dd className="min-w-0 truncate">
            <a href={`mailto:${profile.email}`} className="link-ink text-signal-ink">
              {profile.email}
            </a>
          </dd>
          <dd className="col-start-2 mt-2 sm:col-start-auto sm:mt-0">
            <CopyButton value={profile.email} />
          </dd>
        </div>
        {rows.map((r) => (
          <div key={r.key} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-t py-3 sm:grid-cols-[6rem_minmax(0,1fr)]">
            <dt className="text-muted-foreground">{r.key}</dt>
            <dd className="min-w-0 truncate">
              <ExternalLink href={r.href} className="link-ink">
                {r.value} {r.key === 'resume' ? '↓' : '↗'}
              </ExternalLink>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
