本项目基于 TypeScript 和 Node.js 开发，实现了一个插件化的最小形态 Agent 引擎。

## 核心特性
- **插件化解耦**：基于 Context 实现依赖注入，LLM、Tool、Session、AgentEngine 互不依赖。
- **工具链扩展**：支持 Tavily Web Search API 与基于 Cheerio 的 Web Fetch DOM 解析。
- **TUI 交互界面**：基于 Node.js `readline` 模块实现终端持久化多轮对话。
- **安全防泄漏**：使用 `.gitignore` 拦截 `.env` 文件，环境变量管理 API Key。

## 目录结构
```text
src/
├── core/                  # 核心引擎层
│   ├── context.ts         # DI 容器
│   ├── types.ts           # 类型契约定义
│   └── agent-loop.ts      # 核心思考循环 (MyAgentEngine)
├── plugins/               # 插件层
│   ├── llm-deepseek.ts    # DeepSeek 模型接入
│   ├── session-memory.ts  # 会话记忆
│   ├── tool-fetch.ts      # 网页抓取与 DOM 清洗
│   └── tool-websearch.ts  # Tavily 搜索
├── cli.ts                 # TUI 交互界面
└── index.ts               # 组装与启动入口
