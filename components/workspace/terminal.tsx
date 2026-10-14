'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '@/content/profile';
import { experience } from '@/content/experience';
import { projects } from '@/content/projects';
import { CLEAR_COMMANDS, suggestions } from '@/lib/assistant/intents';
import { normalize } from '@/lib/assistant/match';
import { localResponder } from '@/lib/assistant/local-responder';
import type { AssistantReply } from '@/lib/assistant/types';
import { BlockView } from '@/components/blocks/block-view';
import { Prompt, type PromptHandle } from './prompt';
import { useReducedMotion } from './hooks';
import { useWorkspace } from './workspace-context';
import { cn } from '@/lib/utils';

interface TurnState {
  id: number;
  query: string;
  reply: AssistantReply | null;
}

const RESOLVE_MS = 380;
const responder = localResponder;

/* ---------------------------------------------------------------- welcome */

function useTyped(text: string, enabled: boolean) {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (!enabled) {
      setShown(text);
      return;
    }
    setShown('');
    let i = 0;
    let timer: number;
    const tick = () => {
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) timer = window.setTimeout(tick, 70);
    };
    timer = window.setTimeout(tick, 350);
    return () => window.clearTimeout(timer);
  }, [text, enabled]);
  return shown;
}

function LastLogin() {
  const [stamp, setStamp] = useState<string | null>(null);
  useEffect(() => {
    const d = new Date();
    setStamp(
      d.toLocaleString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
  }, []);
  return (
    <p className="font-mono text-meta text-dim">
      Last login: {stamp ?? '…'} on web <span className="hidden sm:inline">· everything here runs in your browser</span>
    </p>
  );
}

function Facts() {
  const current = experience.find((r) => r.current);
  const live = projects.find((p) => p.links.store);
  const rows: [string, string][] = [
    ['at', current ? `${current.company}, since ${current.start}` : profile.company],
    ['works in', 'React Native · React · Node.js'],
    ['shipped', live ? `${live.name}, on Google Play` : '—'],
  ];
  return (
    <div className="flex gap-5">
      <Image
        src="/assets/images/profile-image.jpeg"
        alt={`Portrait of ${profile.name}`}
        width={144}
        height={144}
        className="h-[4.5rem] w-[4.5rem] shrink-0 object-cover"
        priority
      />
      <dl className="min-w-0 font-mono text-[13px] leading-6">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-3">
            <dt className="text-dim">{k}</dt>
            <dd className="min-w-0 text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * The first visit types `whoami` before the rest appears. An inline script in
 * the layout sets html[data-intro="play"] before first paint, so nothing flashes
 * and the page stays fully visible without JavaScript.
 *
 * The welcome fills the first screen: a status line on top, the name and what I
 * do in the middle, and the suggested commands resting on the prompt below.
 */
function Welcome({ onPick, animate }: { onPick: (cmd: string) => void; animate: boolean }) {
  const typed = useTyped('whoami', animate);
  const done = typed === 'whoami';
  useEffect(() => {
    if (done) document.documentElement.removeAttribute('data-intro');
  }, [done]);
  const gate = (i: number, extra = '') => ({
    className: `intro-gated ${done ? 'rise' : ''} ${extra}`,
    style: { '--i': i } as React.CSSProperties,
  });
  return (
    <section
      aria-labelledby="whoami-name"
      className="flex min-h-[calc(100dvh-14rem)] flex-col gap-12 lg:min-h-[calc(100dvh-12.5rem)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <LastLogin />
        <p className="font-mono text-meta text-muted-foreground">
          <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] bg-sage" />
          open to new projects
        </p>
      </div>

      <div className="my-auto">
        <p className="font-mono text-[15px]" aria-label="whoami">
          <span className="text-muted-foreground">~/{profile.handle}</span>{' '}
          <span className="text-signal-ink">❯</span>{' '}
          <span className={animate ? 'intro-cmd typing' : 'intro-cmd'}>{typed}</span>
          {!done && <span aria-hidden className="caret ml-0.5" />}
        </p>
        <div {...gate(0)}>
          <h1 id="whoami-name" className="-ml-[0.04em] mt-3 text-hero font-medium">
            {profile.name}
          </h1>
        </div>
        <div {...gate(1, 'mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10')}>
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="text-lead text-muted-foreground">
              {profile.role} at <span className="text-foreground">{profile.company}</span>
            </p>
            <p className="mt-3 max-w-[46ch] text-lead">{profile.statement}</p>
          </div>
          <div className="hidden sm:block lg:col-span-5 lg:pt-1 xl:col-start-8">
            <Facts />
          </div>
        </div>
      </div>

      <div {...gate(2)}>
        <p className="font-mono text-meta text-dim">try one, or ask in your own words</p>
        <ul className="mt-3 grid border-l border-t sm:grid-cols-2 xl:grid-cols-3">
          {suggestions.map((s) => (
            <li key={s.command} className="border-b border-r">
              <button
                type="button"
                onClick={() => onPick(s.command)}
                className="group flex min-h-[3.5rem] w-full flex-col justify-center gap-0.5 px-3 py-2.5 text-left transition-colors duration-2 hover:bg-surface focus-visible:bg-surface"
              >
                <span className="font-mono text-[13px] text-muted-foreground transition-colors duration-2 group-hover:text-foreground">
                  <span
                    aria-hidden
                    className="mr-2 inline-block text-dim transition-[color,transform] duration-2 ease-out group-hover:translate-x-0.5 group-hover:text-signal-ink"
                  >
                    ❯
                  </span>
                  {s.command}
                </span>
                <span className="text-[15px] text-foreground">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ turns */

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function Resolving() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setFrame((f) => f + 1), 60);
    return () => window.clearInterval(id);
  }, []);
  const steps = ['parse', 'match', 'render'];
  const active = Math.min(Math.floor((frame * 60) / (RESOLVE_MS / steps.length)), steps.length - 1);
  return (
    <p className="mt-3 font-mono text-meta text-muted-foreground" role="status">
      <span aria-hidden className="mr-2 inline-block w-3 text-signal-ink">
        {SPINNER[frame % SPINNER.length]}
      </span>
      {steps.map((s, i) => (
        <span key={s} className={i <= active ? 'text-foreground' : 'text-dim'}>
          {s}
          {i < steps.length - 1 && <span className="text-dim"> → </span>}
        </span>
      ))}
    </p>
  );
}

function TraceLine({ reply }: { reply: AssistantReply }) {
  const { trace, intent } = reply;
  return (
    <p className="mt-2 font-mono text-meta text-dim">
      <span aria-hidden>↳ </span>
      {trace.method === 'command' && (
        <>
          command <span className="text-muted-foreground">{trace.hits[0]}</span> → {intent}
        </>
      )}
      {trace.method === 'keywords' && (
        <>
          intent <span className="text-muted-foreground">{intent}</span> · matched{' '}
          {trace.hits.map((h) => `“${h}”`).join(', ')}
        </>
      )}
      {trace.method === 'none' && <>no match · keyword router, not a language model</>}
    </p>
  );
}

function Turn({
  turn,
  onPick,
  innerRef,
  isLast,
}: {
  turn: TurnState;
  onPick: (cmd: string) => void;
  innerRef?: React.Ref<HTMLElement>;
  isLast: boolean;
}) {
  const { reply } = turn;
  return (
    <article
      ref={innerRef}
      aria-label={`You asked: ${turn.query}`}
      className={cn('scroll-mt-6', isLast && 'min-h-[calc(100dvh-15rem)] lg:min-h-[calc(100dvh-12rem)]')}
    >
      <p className="border-l-2 border-signal bg-surface px-3 py-2.5 font-mono text-[15px]">
        <span aria-hidden className="mr-2 text-signal-ink">
          ❯
        </span>
        <span className="sr-only">You asked: </span>
        {turn.query}
      </p>
      {!reply ? (
        <Resolving />
      ) : (
        <div>
          <TraceLine reply={reply} />
          <div className="mt-5 space-y-6">
            {reply.blocks.map((b, i) => (
              <div key={i} className="rise" style={{ '--i': i } as React.CSSProperties}>
                <BlockView block={b} />
              </div>
            ))}
          </div>
          {reply.next.length > 0 && (
            <div
              className="rise mt-6 flex flex-wrap items-center gap-2"
              style={{ '--i': reply.blocks.length } as React.CSSProperties}
            >
              <span className="mr-1 font-mono text-meta text-dim">next</span>
              {reply.next.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => onPick(cmd)}
                  className="press h-9 border px-3 font-mono text-[13px] text-muted-foreground transition-colors duration-2 hover:border-border-strong hover:text-foreground"
                >
                  {cmd}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

/* --------------------------------------------------------------- terminal */

export function Terminal() {
  const { registerRunner } = useWorkspace();
  const reduced = useReducedMotion();
  const [turns, setTurns] = useState<TurnState[]>([]);
  /** How many turns are visible; Back/Forward move this without losing turns. */
  const [visible, setVisible] = useState(0);
  const [busy, setBusy] = useState(false);
  const [animateIntro, setAnimateIntro] = useState(false);
  const prompt = useRef<PromptHandle>(null);
  const lastTurn = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const scrollOnRender = useRef(false);
  const nextId = useRef(1);
  const state = useRef({ turns, visible, reduced });
  state.current = { turns, visible, reduced };

  const execute = useCallback(async (query: string, mode: 'push' | 'replace' = 'push') => {
    const { turns: all, visible: n, reduced: r } = state.current;

    if (CLEAR_COMMANDS.includes(normalize(query))) {
      setTurns([]);
      setVisible(0);
      window.history.pushState({ n: 0 }, '', '/');
      return;
    }

    const id = nextId.current++;
    const kept = all.slice(0, n);
    const nextTurns = [...kept, { id, query, reply: null }];
    setTurns(nextTurns);
    setVisible(nextTurns.length);
    scrollOnRender.current = true;
    const url = `/?q=${encodeURIComponent(query)}`;
    if (mode === 'push') window.history.pushState({ n: nextTurns.length }, '', url);
    else window.history.replaceState({ n: nextTurns.length }, '', url);

    setBusy(true);
    const [reply] = await Promise.all([
      responder(query, kept.filter((t): t is TurnState & { reply: AssistantReply } => !!t.reply)),
      new Promise((res) => window.setTimeout(res, r ? 0 : RESOLVE_MS)),
    ]);
    setTurns((cur) => cur.map((t) => (t.id === id ? { ...t, reply } : t)));
    setBusy(false);
  }, []);

  /** Clicks type the command into the prompt first, so visitors learn the commands. */
  const pick = useCallback(
    async (command: string) => {
      if (state.current.turns.some((t) => !t.reply)) return;
      await prompt.current?.type(command, state.current.reduced);
      prompt.current?.type('', true);
      await execute(command);
      if (window.matchMedia('(pointer: fine)').matches) prompt.current?.focus();
    },
    [execute],
  );

  // Let the palette and in-answer links run commands here.
  useEffect(() => {
    registerRunner((cmd) => void pick(cmd));
    return () => registerRunner(null);
  }, [registerRunner, pick]);

  // First load: deep link (?q=) or a fresh session.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    setAnimateIntro(document.documentElement.dataset.intro === 'play');
    if (q) void execute(q, 'replace');
    else window.history.replaceState({ n: 0 }, '', window.location.pathname);
  }, [execute]);

  // Back/Forward walk through the conversation.
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const n = typeof e.state?.n === 'number' ? e.state.n : 0;
      const { turns: all } = state.current;
      if (n <= all.length) {
        scrollOnRender.current = true;
        setVisible(n);
      }
      else {
        const q = new URLSearchParams(window.location.search).get('q');
        if (q) void execute(q, 'replace');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [execute]);

  // Bring each new question to the top of the view: once when it is asked,
  // and again when its answer renders and the page grows.
  const lastReady = Boolean(turns[visible - 1]?.reply);
  useEffect(() => {
    if (!scrollOnRender.current) return;
    const el = lastTurn.current;
    const box = scroller.current;
    if (!el || !box) return;
    if (lastReady) scrollOnRender.current = false;
    const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 24;
    box.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  }, [turns.length, visible, lastReady, reduced]);

  // "/" focuses the prompt, as in many developer tools.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (target.closest('input, textarea, [contenteditable="true"], [role="dialog"]')) return;
      e.preventDefault();
      prompt.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const shown = turns.slice(0, visible);
  const history = turns.map((t) => t.query);

  return (
    <div className="flex h-[calc(100dvh-3rem)] flex-col lg:h-[calc(100dvh-var(--status-h))]">
      <div ref={scroller} className="scrollbar-quiet relative min-h-0 flex-1 overflow-y-auto [overflow-anchor:none]">
        <div className="mx-auto flex min-h-full w-full max-w-[80rem] flex-col justify-end px-4 pb-10 pt-6 sm:px-8 lg:px-14">
          <Welcome onPick={pick} animate={animateIntro} />
          <noscript>
            <p className="mt-8 text-body">
              The terminal needs JavaScript. Everything is also on plain pages:{' '}
              <Link href="/projects" className="link-ink">projects</Link>, <Link href="/experience" className="link-ink">experience</Link>,{' '}
              <Link href="/skills" className="link-ink">skills</Link>, <Link href="/about" className="link-ink">about</Link>,{' '}
              <Link href="/contact" className="link-ink">contact</Link>.
            </p>
          </noscript>
          {shown.length > 0 && (
            <div role="log" aria-live="polite" aria-label="Conversation" className="mt-16 max-w-3xl space-y-16">
              {shown.map((t, i) => (
                <Turn
                  key={t.id}
                  turn={t}
                  onPick={pick}
                  isLast={i === shown.length - 1}
                  innerRef={i === shown.length - 1 ? lastTurn : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t bg-background pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-8 lg:px-14">
          <div className="max-w-3xl">
            <Prompt ref={prompt} onSubmit={(q) => void execute(q)} history={history} busy={busy} />
          </div>
        </div>
      </div>
    </div>
  );
}
