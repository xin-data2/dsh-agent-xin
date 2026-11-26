import 'dotenv/config'; // 👈 读取环境变量（防泄漏用）
import * as readline from 'node:readline';
// 👇 注意这里，改成了 MyAgentEngine
import { MyAgentEngine } from './core/agent-loop';

export function startCLI(engine: MyAgentEngine) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n=============================================");
  console.log("🤖 欢迎使用 [你的名字] 的 DSH 核心 Agent 引擎！");
  console.log("✨ 输入你的问题（例如：帮我搜一下今天的科技新闻）");
  console.log("✨ 输入 /quit 或 /exit 可以退出程序。");
  console.log("=============================================\n");

  const promptUser = () => {
    rl.question('👤 你: ', async (input) => {
      const text = input.trim();

      if (text === '/quit' || text === '/exit') {
        console.log("👋 再见！");
        rl.close();
        return;
      }

      if (!text) {
        promptUser();
        return;
      }

      try {
        console.log("🤖 AI: 思考中...\n");
        // 👇 调用改名后的引擎
        const answer = await engine.run(text);
        console.log(`🤖 AI:\n${answer}\n`);
      } catch (error: any) {
        console.error(`❌ 出错了: ${error.message}\n`);
      }

      // 递归调用，持续对话
      promptUser();
    });
  };

  promptUser();
}