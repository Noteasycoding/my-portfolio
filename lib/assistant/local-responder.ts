import { intents } from './intents';
import { match } from './match';
import type { Responder } from './types';

const DEFAULT_NEXT = ['whoami', 'ls projects', 'help'];

/**
 * Keyword and command routing over the portfolio content. It never claims to
 * understand more than it does: anything below the match threshold gets an
 * honest fallback.
 */
export const localResponder: Responder = async (query) => {
  const result = match(query);

  if (!result.intent) {
    const next = result.closest.length
      ? result.closest.map((i) => i.commands[0])
      : DEFAULT_NEXT;
    return {
      intent: 'fallback',
      trace: result.trace,
      blocks: [{ type: 'fallback', query }],
      next,
    };
  }

  return {
    intent: result.intent.id,
    trace: result.trace,
    blocks: result.intent.blocks,
    next: result.intent.next,
  };
};

export const intentCount = intents.length;
