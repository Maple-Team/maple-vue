import Dep from "./dep";

export function defineProperty(
  data: Record<string, any>,
  key: string | symbol,
  val: any
) {
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    set(newVal) {
      if (newVal === val) {
        return;
      }
      dep.notify();
    },
    get() {
      dep.depend();
      return val;
    },
  });
}
