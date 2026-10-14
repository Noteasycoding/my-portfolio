'use client';

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { allCommands } from '@/lib/assistant/intents';
import { cn } from '@/lib/utils';
import { useModKey } from './hooks';

export interface PromptHandle {
  focus: () => void;
  /** Types `text` into the field, then resolves. Instant when `instant`. */
  type: (text: string, instant: boolean) => Promise<void>;
}

interface PromptProps {
  onSubmit: (value: string) => void;
  history: string[];
  busy: boolean;
}

export const Prompt = forwardRef<PromptHandle, PromptProps>(function Prompt({ onSubmit, history, busy }, ref) {
  const [value, setValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [completion, setCompletion] = useState<{ prefix: string; index: number } | null>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const mod = useModKey();

  // Auto-grow up to a few lines.
  useLayoutEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  useImperativeHandle(ref, () => ({
    focus: () => area.current?.focus({ preventScroll: true }),
    type: (text, instant) =>
      new Promise<void>((resolve) => {
        if (instant) {
          setValue(text);
          resolve();
          return;
        }
        setTyping(true);
        const step = Math.max(8, Math.min(22, 320 / text.length));
        let i = 0;
        const tick = () => {
          i += 1;
          setValue(text.slice(0, i));
          if (i < text.length) window.setTimeout(tick, step);
          else
            window.setTimeout(() => {
              setTyping(false);
              resolve();
            }, 90);
        };
        tick();
      }),
  }));

  const prefix = completion?.prefix ?? value.trim().toLowerCase();
  const candidates = prefix ? allCommands.filter((c) => c.startsWith(prefix) && c !== prefix) : [];

  const submit = () => {
    const q = value.trim();
    if (!q || busy || typing) return;
    onSubmit(q);
    setValue('');
    setHistoryIndex(null);
    setCompletion(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
      return;
    }

    // Tab completes a command; with nothing to complete, Tab moves focus as usual.
    if (e.key === 'Tab' && !e.shiftKey && candidates.length) {
      e.preventDefault();
      const index = completion ? (completion.index + 1) % candidates.length : 0;
      setCompletion({ prefix, index });
      setValue(candidates[index]);
      return;
    }

    const el = e.currentTarget;
    const singleLine = !value.includes('\n');
    if (e.key === 'ArrowUp' && singleLine && history.length && el.selectionStart === el.selectionEnd) {
      e.preventDefault();
      const next = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }
    if (e.key === 'ArrowDown' && singleLine && historyIndex !== null) {
      e.preventDefault();
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setValue('');
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
      return;
    }
    if (e.key === 'Escape' && value) {
      e.preventDefault();
      setValue('');
      setHistoryIndex(null);
      setCompletion(null);
    }
  };

  const hint = candidates.length && !completion ? candidates[0] : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="w-full"
    >
      <label htmlFor="prompt" className="sr-only">
        Ask about my work, or type a command such as help
      </label>
      <div
        className={cn(
          'flex items-end gap-3 border bg-surface py-1.5 pl-3 pr-1.5 transition-colors duration-2',
          'border-border-strong focus-within:border-signal',
        )}
      >
        <span aria-hidden className="select-none pb-[0.55rem] font-mono text-base text-signal-ink">
          ❯
        </span>
        <textarea
          id="prompt"
          ref={area}
          rows={1}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setHistoryIndex(null);
            setCompletion(null);
          }}
          onKeyDown={onKeyDown}
          readOnly={typing}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          placeholder="Ask me, or type help"
          className="scrollbar-quiet min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 font-mono text-base leading-6 outline-none placeholder:text-dim"
        />
        <button
          type="submit"
          disabled={!value.trim() || busy || typing}
          className="press mb-0.5 flex h-10 shrink-0 items-center gap-2 bg-signal px-3 font-mono text-[13px] text-signal-foreground disabled:bg-raised disabled:text-dim"
        >
          run <span aria-hidden>↵</span>
        </button>
      </div>
      <div className="mt-2 hidden items-center justify-between gap-4 font-mono text-meta text-dim sm:flex">
        <p aria-live="polite">
          {hint ? (
            <>
              <kbd className="kbd">tab</kbd> <span className="text-muted-foreground">{hint}</span>
            </>
          ) : (
            <>
              <kbd className="kbd">↵</kbd> run <kbd className="kbd ml-2">↑</kbd> history{' '}
              <kbd className="kbd ml-2">tab</kbd> complete
            </>
          )}
        </p>
        <p>
          <kbd className="kbd">{mod}</kbd> <kbd className="kbd">K</kbd> everything
        </p>
      </div>
    </form>
  );
});
