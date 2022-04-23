import { parsePath } from "./util";

export default class Watcher {
  vm: any;
  getter;
  cb: Function;
  value: any;
  constructor(vm: any, expOrFn: string, cb: Function) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }
  get(): any {
    window.target = this; // 设置当前实例到target中
    let value = this.getter?.call(this.vm, this.vm); // 读取值，触发get，收集依赖
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this, this.value, oldValue);
  }
}
