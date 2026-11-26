export class Context {
  private services: Map<string, any> = new Map();

  register(name: string, instance: any) {
    this.services.set(name, instance);
  }
  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`[错误] 容器里没有找到名叫 ${name} 的插槽！`);
    }
    return service as T;
  }
}
