import OpenAI from 'openai';
import { LLM, Tool, Message } from '../core/types';

export class MyDeepSeekChat implements LLM {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey, baseURL: 'https://api.deepseek.com' });
  }

  async chat(messages: Message[], tools: Tool[]): Promise<{ type: 'text', content: string } | { type: 'tool_call', toolName: string, args: any }> {
    
    // 👇 打印检查：看看 tools 数组里到底有没有 web_search
    console.log('🚀 [LLM插件] 收到可用工具列表:', tools.map(t => t.name));

    // 动态解析工具的 JSON Schema 参数
    const openAITools = tools.map(t => {
      const paramName = t.name === 'web_search' ? 'query' : 'url';
      const paramDesc = t.name === 'web_search' ? '搜索关键词' : '要抓取的网页URL';
      
      return {
        type: 'function' as const,
        function: {
          name: t.name, 
          description: t.description,
          parameters: { 
            type: 'object', 
            properties: { 
              [paramName]: { type: 'string', description: paramDesc } 
            }, 
            required: [paramName] 
          }
        }
      };
    });

    // 检查是否真的有 web_search 这个工具
    const hasWebSearch = tools.some(t => t.name === 'web_search');

    const response = await this.openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: messages,
      tools: openAITools.length > 0 ? openAITools : undefined,
      // 👇 核心修改：如果存在搜索工具，就点名强制它调用！如果没有，就 auto
          // 👇 把原来的 tool_choice 替换成下面这行
    tool_choice: 'auto',
    });
    
    const message = response.choices[0].message;
    
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0] as any;
      return { type: 'tool_call' as const, toolName: toolCall.function.name, args: JSON.parse(toolCall.function.arguments) };
    }
    
    return { type: 'text' as const, content: message.content || '模型没有返回内容' };
  }
}