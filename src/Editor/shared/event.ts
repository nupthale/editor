// 实现一个eventEmit class， 包括on、off、emit、once方法
export class EventEmit {
    private events: Record<string, Function[]> = {};

    on(event: string, fn: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(fn);
    }

    off(event: string, fn: Function) {
        if (!this.events[event]) {
            return;                 
        }
        this.events[event] = this.events[event].filter((f) => f !== fn);
    }

    emit(event: string, ...args: any[]) {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach((fn) => fn(...args));
    }

    once(event: string, fn: Function) {
        const onceFn = (...args: any[]) => {
            fn(...args);
            this.off(event, onceFn);
        }
        this.on(event, onceFn);
    }

    destroy() {
        this.events = {};
    }
}