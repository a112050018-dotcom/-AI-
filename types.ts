export enum AppState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  REVEALED = 'REVEALED',
}

export enum AnswerStyle {
  MYSTICAL = 'Mystical & Cryptic',
  DIRECT = 'Direct & Concise',
  GENTLE = 'Gentle & Encouraging',
}

export interface OracleRequest {
  question: string;
  style: AnswerStyle;
}

export interface OracleResponse {
  answer: string;
}

// OpenRouter API Types
export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterCompletionRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
}
