'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { skills } from '@/content/skills';
import { cn } from '@/lib/utils';
import { ExternalLink } from './run-link';

function Evidence({ label, href }: { label: string; href: string }) {
  const cls = 'link-ink text-muted-foreground hover:text-foreground';
  return href.startsWith('/') ? (
    <Link href={href} className={cls}>
      {label}
    </Link>
  ) : (
    <ExternalLink href={href} className={cls}>
      {label} ↗
    </ExternalLink>
  );
}

function TableView() {
  return (
    <dl className="border-b">
      {skills.map((g) => (
        <div key={g.id} className="grid gap-x-6 gap-y-2 border-t py-5 md:grid-cols-[12rem_minmax(0,1fr)]">
          <dt>
            <span className="block text-body font-medium">{g.name}</span>
            <span className="block text-[15px] leading-snug text-muted-foreground">{g.use}</span>
          </dt>
          <dd className="min-w-0">
            <p className="font-mono text-[15px]">{g.tools.join(' · ')}</p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[15px]">
              <span className="font-mono text-meta leading-6 text-dim">used in</span>
              {g.evidence.map((e) => (
                <Evidence key={e.label} {...e} />
              ))}
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The same data as real, valid JSON. Syntax colours: keys ink, strings sage. */
function JsonView() {
  const data = Object.fromEntries(skills.map((g) => [g.id, g.tools]));
  const entries = Object.entries(data);
  return (
    <pre className="scrollbar-quiet overflow-x-auto border bg-surface p-4 font-mono text-[13px] leading-6">
      <code>
        <span className="text-dim">{'{'}</span>
        {'\n'}
        {entries.map(([key, tools], i) => (
          <span key={key}>
            {'  '}
            <span className="text-foreground">&quot;{key}&quot;</span>
            <span className="text-dim">: [</span>
            {tools.map((t, j) => (
              <span key={t}>
                <span className="text-sage">&quot;{t}&quot;</span>
                {j < tools.length - 1 && <span className="text-dim">, </span>}
              </span>
            ))}
            <span className="text-dim">]{i < entries.length - 1 ? ',' : ''}</span>
            {'\n'}
          </span>
        ))}
        <span className="text-dim">{'}'}</span>
      </code>
    </pre>
  );
}

export function SkillMap() {
  const [view, setView] = useState<'table' | 'json'>('table');
  const id = useId();

  return (
    <div>
      <div role="tablist" aria-label="Skills view" className="mb-4 flex gap-1 font-mono text-meta">
        {(['table', 'json'] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            id={`${id}-${v}-tab`}
            aria-selected={view === v}
            aria-controls={`${id}-panel`}
            onClick={() => setView(v)}
            className={cn(
              'press h-8 border px-3 transition-colors duration-2',
              view === v
                ? 'border-border-strong bg-surface text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {v === 'json' ? 'skills.json' : 'by use'}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${view}-tab`}>
        {view === 'table' ? <TableView /> : <JsonView />}
      </div>
    </div>
  );
}
