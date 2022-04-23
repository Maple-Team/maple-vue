const bailRE = /[^\w.$]/;
/**
 * 根据路径读取值
 * 先将keypath用.分隔成数组，然后循环数组一层一层的获取数据，最后拿到的obj就是keypath中想读取的数据
 * @param path
 * @returns
 */
export function parsePath(path: string) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split(".");
  return function (obj: { [x: string]: any }) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

import Dep from "./dep";
import { Observer } from "./observer";

export function defineReactive(
  data: Record<string, any>,
  key: string | symbol,
  val: any
) {
  if (typeof val === "object") {
    new Observer(val);
  }
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
