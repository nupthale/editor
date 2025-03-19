// 序号缓存管理器
export class OrderListNumberCache {
    private static instance: OrderListNumberCache;
    private numberMap: Map<string, string> = new Map(); // id -> 格式化序号
    private dirty: boolean = true;
  
    private constructor() {}
  
    static getInstance(): OrderListNumberCache {
      if (!OrderListNumberCache.instance) {
        OrderListNumberCache.instance = new OrderListNumberCache();
      }
      return OrderListNumberCache.instance;
    }
  
    // 获取列表项的序号
    getNumber(id: string): string {
      return this.numberMap.get(id) || '';
    }
  
    // 设置列表项的序号
    setNumber(id: string, number: string): void {
      this.numberMap.set(id, number);
    }
  
    // 标记缓存需要更新
    markDirty(): void {
      this.dirty = true;
    }
  
    // 检查缓存是否需要更新
    isDirty(): boolean {
      return this.dirty;
    }
  
    // 清除脏标记
    clearDirty(): void {
      this.dirty = false;
    }
  
    // 清空缓存
    clear(): void {
      this.numberMap.clear();
      this.dirty = true;
    }
  }
  
  export const orderListNumberCache = OrderListNumberCache.getInstance();

  window.abc = orderListNumberCache;