import { Context } from './context';
import { LLM, Session, Tool, Preset } from './types';

// ⚠️ 改名成了 MyAgentEngine
export class MyAgentEngine {
  constructor(private ctx: Context, private preset: Preset) {}

  async run(userInput: string) {
    const llm = this.ctx.get<LLM>('llm');
    const session = this.ctx.get<Session>('session');
    
    session.addMessage({ role: 'system', content: this.preset.systemPrompt });
    session.addMessage({ role: 'user', content: userInput });

    let turns = 0;
    while (turns < 5) {
      turns++;
      const res = await llm.chat(session.getMessages(), this.preset.tools);
      
      if (res.type === 'text') return res.content;
      
      if (res.type === 'tool_call') {
        console.log(`🔧 [引擎] 准备执行工具: ${res.toolName}`);
        const tool = this.preset.tools.find(t => t.name === res.toolName);
        if (!tool) throw new Error(`找不到工具`);
        
        // 加一点你独有的“性能监控”代码，证明是你自己写的
        const start = Date.now();
        const result = await tool.execute(res.args);
        console.log(`⏱️ [性能] 工具执行耗时: ${Date.now() - start}ms`);
        
        session.addMessage({ role: 'assistant', content: `[调用工具 ${res.toolName}]` });
        session.addMessage({ role: 'user', content: `工具返回: ${result}` });
      }
    }
    return "达到最大循环次数，停止。";
  }
}