/**
 * The assistant answers in structured blocks, not free text, so every answer is
 * rendered from real portfolio data. A future LLM-backed responder only has to
 * return the same `AssistantReply` shape.
 */
export type Block =
  | { type: 'text'; text: string }
  | { type: 'about' }
  | { type: 'projects' }
  | { type: 'project'; slug: string }
  | { type: 'timeline' }
  | { type: 'skills' }
  | { type: 'architecture' }
  | { type: 'contact' }
  | { type: 'resume' }
  | { type: 'help' }
  | { type: 'fallback'; query: string };

export interface MatchTrace {
  /** How the query was understood, shown to the visitor verbatim. */
  method: 'command' | 'keywords' | 'none';
  hits: string[];
}

export interface AssistantReply {
  intent: string;
  trace: MatchTrace;
  blocks: Block[];
  /** Follow-up commands offered under the answer. */
  next: string[];
}

export interface Turn {
  id: number;
  query: string;
  reply: AssistantReply;
}

export type Responder = (query: string, history: Turn[]) => Promise<AssistantReply>;
