import axios from 'axios';
import * as cheerio from 'cheerio';
import { Tool } from '../core/types';

export const fetchTool: Tool = {
  name: 'fetch_page',
  description: '抓取网页内容',
  execute: async (args) => {
    console.log(`🕸️ [执行工具] 正在爬取: ${args.url}`);
    try {
      const response = await axios.get(args.url, { timeout: 5000 });
      const $ = cheerio.load(response.data);
      $('script, style, noscript').remove();
      let text = $('body').text().replace(/\s+/g, ' ').trim();
      return text.length > 2000 ? text.slice(0, 2000) + '...' : text;
    } catch (error: any) {
      return `抓取失败: ${error.message}`;
    }
  }
};