export class Context {
  private services: Map<string, any> = new Map();

  // 往插槽里插东西
  register(name: string, instance: any) {
    this.services.set(name, instance);
  }

  // 从插槽里拿东西
  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`[错误] 容器里没有找到名叫 ${name} 的插槽！`);
    }
    return service as T;
  }
}