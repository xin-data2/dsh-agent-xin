import { Session, Message } from '../core/types';

export class ChatMemory implements Session {
  logs: string[] = [];
  private messages: Message[] = [];

  addLog(log: string) {
    this.logs.push(log);
    console.log(`📝 [记忆容器] ${log}`);
  }

  getMessages() { 
    return this.messages; 
  }

  addMessage(msg: Message) { 
    this.messages.push(msg); 
  } 

  
  getLogs() { 
    return this.logs; 
  }
}