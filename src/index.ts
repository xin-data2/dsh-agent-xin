import 'dotenv/config'; 
import { Context } from './core/context';
import { MyAgentEngine } from './core/agent-loop';
import { ChatMemory } from './plugins/session-memory';
import { MyDeepSeekChat } from './plugins/llm-deepseek';
import { fetchTool } from './plugins/tool-fetch';
import { webSearchTool } from './plugins/tool-websearch';
import { Preset } from './core/types';
import { startCLI } from './cli';

const ctx = new Context();


const MY_KEY = process.env.DEEPSEEK_API_KEY || 'sk-123';
ctx.register('llm', new MyDeepSeekChat(MY_KEY));
ctx.register('session', new ChatMemory());

const researchPreset: Preset = {
  name: '全能搜索助手',
  description: '可以联网搜索并抓取网页',
  systemPrompt: '你是一个具备联网搜索能力的超级 AI Agent。如果用户询问实时信息或新闻，你【必须】调用 web_search 工具！',
  tools: [fetchTool, webSearchTool],
};

const engine = new MyAgentEngine(ctx, researchPreset);

startCLI(engine);
