import { intents, type Intent } from './intents';
import type { MatchTrace } from './types';

export interface MatchResult {
  intent: Intent | null;
  score: number;
  trace: MatchTrace;
  /** Best partial candidates, used to suggest something useful on a miss. */
  closest: Intent[];
}

const THRESHOLD = 2;

export function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[^a-z0-9./'\-?é ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(text: string) {
  return text
    .replace(/[?.]/g, ' ')
    .split(' ')
    .filter(Boolean);
}

/** Levenshtein distance, capped: we only care whether it is 0, 1 or "more". */
function within1(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

function scoreIntent(intent: Intent, text: string, words: string[]) {
  let score = 0;
  const hits: string[] = [];
  for (const [key, weight] of Object.entries(intent.keywords)) {
    let hit = false;
    if (key.includes(' ')) {
      hit = ` ${text} `.includes(` ${key} `);
    } else {
      // Tolerate one typo on longer words ("projcts", "experiance"). Short words
      // stay exact so "react" never turns into "reach".
      hit = words.some((w) => w === key || (key.length >= 6 && within1(w, key)));
    }
    if (hit) {
      score += weight;
      hits.push(key);
    }
  }
  return { score, hits };
}

export function match(input: string): MatchResult {
  const text = normalize(input);

  const exact = intents.find((i) => i.commands.includes(text));
  if (exact) {
    return { intent: exact, score: Infinity, trace: { method: 'command', hits: [text] }, closest: [] };
  }

  const words = tokens(text);
  const ranked = intents
    .map((intent) => ({ intent, ...scoreIntent(intent, text, words) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (best && best.score >= THRESHOLD) {
    return {
      intent: best.intent,
      score: best.score,
      trace: { method: 'keywords', hits: best.hits },
      closest: [],
    };
  }

  return {
    intent: null,
    score: best?.score ?? 0,
    trace: { method: 'none', hits: [] },
    closest: ranked.slice(0, 3).map((r) => r.intent),
  };
}
