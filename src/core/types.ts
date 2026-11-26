export interface Tool {
  name: string;
  description: string;
  execute: (args: any) => Promise<string>;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface Session {
  logs: string[];
  addLog: (log: string) => void;
  getMessages: () => Message[];
  addMessage: (msg: Message) => void;
}

export interface LLM {
  chat: (messages: Message[], tools: Tool[]) => Promise<{ type: 'text', content: string } | { type: 'tool_call', toolName: string, args: any }>;
}

export interface Preset {
  name: string;
  description: string;
  systemPrompt: string;
  tools: Tool[];
}