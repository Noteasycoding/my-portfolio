'use client';

import { Fragment } from 'react';
import { profile } from '@/content/profile';
import { experience } from '@/content/experience';
import { intents } from '@/lib/assistant/intents';
import { ExternalLink, RunLink } from './run-link';
import { useWorkspace } from '@/components/workspace/workspace-context';

export function About() {
  const current = experience.find((r) => r.current);
  return (
    <div className="max-w-[62ch] space-y-4 text-body">
      {profile.about.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {current && (
        <p className="font-mono text-meta text-muted-foreground">
          now: {current.title} · {current.company} · since {current.start}
        </p>
      )}
    </div>
  );
}

/**
 * Only facts from the projects themselves. Each lane is one system, drawn as
 * the path a request takes through it.
 */
const systems = [
  {
    name: 'TrackNab',
    slug: 'tracknab',
    lane: ['Parent app', 'Driver app', 'Backend APIs'],
    note: 'A parent app and a driver app around live bus tracking, trip management and NFC check-in/out. I work on the cross-platform mobile side in React Native: the apps, their state, and the integration with APIs the backend team owns.',
  },
  {
    name: 'Netflix Clone',
    slug: 'netflix-clone',
    lane: ['React + Redux', 'REST · JWT', 'Express', 'MongoDB'],
    note: 'A classic MERN split: the client holds UI state in Redux and talks to an Express API that authenticates with JWT.',
  },
  {
    name: 'StockTrack',
    slug: 'stocktrack',
    lane: ['React Native', 'Firestore'],
    note: 'Inventory lives in Firestore and syncs to the app in real time, with stock-level alerts on top.',
  },
  {
    name: 'Superfast5G',
    slug: 'superfast5g',
    lane: ['Subscriber app', 'Admin controls', 'Firebase'],
    note: 'Firebase behind two audiences: subscribers checking plans, usage and recharges, and admins managing users and following recharges.',
  },
];

export function Architecture() {
  return (
    <div>
      <p className="max-w-[62ch] text-body">
        I haven&apos;t written up an architecture philosophy here, and I won&apos;t invent one. Instead, here is what
        the systems I&apos;ve built actually look like.
      </p>
      <ul className="mt-5 border-b">
        {systems.map((s) => (
          <li key={s.slug} className="border-t py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-body font-medium">{s.name}</h3>
              <RunLink
                command={`open ${s.slug}`}
                href={`/projects/${s.slug}`}
                className="font-mono text-meta text-muted-foreground transition-colors duration-2 hover:text-signal-ink"
              >
                case study →
              </RunLink>
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[13px]" aria-label={`${s.name}: ${s.lane.join(', then ')}`}>
              {s.lane.map((node, i) => (
                <Fragment key={node}>
                  <span aria-hidden className="border bg-surface px-2 py-1">
                    {node}
                  </span>
                  {i < s.lane.length - 1 && (
                    <span aria-hidden className="text-dim">
                      →
                    </span>
                  )}
                </Fragment>
              ))}
            </p>
            <p className="mt-3 max-w-[62ch] text-[15px] text-muted-foreground">{s.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Help() {
  const { run } = useWorkspace();
  const visible = intents.filter((i) => !i.id.startsWith('project:'));
  return (
    <div>
      <p className="max-w-[62ch] text-body">
        This terminal is a keyword router over the content of this site, not a language model. It understands these
        commands, and plain questions that use similar words.
      </p>
      <dl className="mt-4 border-b font-mono text-[14px]">
        {visible.map((i) => (
          <div key={i.id} className="grid grid-cols-[minmax(0,11rem)_minmax(0,1fr)] gap-x-4 border-t py-2.5">
            <dt>
              <button
                type="button"
                onClick={() => run(i.commands[0])}
                className="text-left text-signal-ink transition-colors duration-2 hover:text-foreground"
              >
                {i.commands[0]}
              </button>
            </dt>
            <dd className="font-sans text-[15px] text-muted-foreground">{i.description}</dd>
          </div>
        ))}
        <div className="grid grid-cols-[minmax(0,11rem)_minmax(0,1fr)] gap-x-4 border-t py-2.5">
          <dt className="text-signal-ink">open &lt;project&gt;</dt>
          <dd className="font-sans text-[15px] text-muted-foreground">tracknab, superfast5g, stocktrack, netflix-clone</dd>
        </div>
        <div className="grid grid-cols-[minmax(0,11rem)_minmax(0,1fr)] gap-x-4 border-t py-2.5">
          <dt className="text-signal-ink">clear</dt>
          <dd className="font-sans text-[15px] text-muted-foreground">Start a fresh session</dd>
        </div>
      </dl>
    </div>
  );
}

export function Resume() {
  return (
    <p className="max-w-[62ch] text-body">
      The full resume is a PDF on Google Drive:{' '}
      <ExternalLink href={profile.links.resume} className="link-ink text-signal-ink">
        download resume.pdf ↓
      </ExternalLink>
      . The same history is in <span className="font-mono text-[15px]">cat experience.log</span>.
    </p>
  );
}

export function Fallback({ query }: { query: string }) {
  return (
    <div className="max-w-[62ch] text-body">
      <p>
        I don&apos;t have an answer for <span className="font-mono text-[15px]">“{query}”</span>. This terminal matches
        commands and keywords against my portfolio. It isn&apos;t a language model, so it only knows about my work,
        projects, stack and how to reach me.
      </p>
      <p className="mt-3 text-muted-foreground">One of these might be close:</p>
    </div>
  );
}
