import { defineReactive } from "./util";

/**
 * Observer类会附加到每一个被侦测的object上。
 * 一旦被附加上，Observer会将object上所有的属性转换成getter/setter的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖
 */
export class Observer {
  value: any;
  constructor(value: any) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }
  walk(value: any) {
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(value, keys[i], value[keys[i]]);
    }
  }
}
