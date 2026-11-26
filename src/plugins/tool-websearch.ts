import { tavily } from '@tavily/core';
import { Tool } from '../core/types';

// ⚠️ 改成读取环境变量，防泄漏
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || 'tvly-123' });

export const webSearchTool: Tool = {
  name: 'web_search',
  description: '搜索实时信息',
  execute: async (args) => {
    console.log(`🔎 [执行工具] 搜索: ${args.query}`);
    try {
      const response = await tvly.search(args.query, {
        searchDepth: 'basic',
        maxResults: 3,
        includeAnswer: true,
      });

      let resultText = `搜索关键词: ${args.query}\n\n`;
      if (response.answer) resultText += `【直接答案】: ${response.answer}\n\n`;
      resultText += `【相关网页】:\n`;
      response.results.forEach((item, index) => {
        resultText += `${index + 1}. ${item.title}\n   URL: ${item.url}\n   摘要: ${item.content}\n\n`;
      });
      return resultText;
    } catch (error: any) {
      return `搜索失败: ${error.message}`;
    }
  }
};