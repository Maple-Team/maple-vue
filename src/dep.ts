import { Sub } from "./type";

export default class Dep {
  subs: Sub[];
  constructor() {
    this.subs = [];
  }
  addSub(sub: Sub) {
    this.subs.push(sub);
  }
  removeSub(sub: Sub) {
    remove(this.subs, sub);
  }
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let index = 0; index < subs.length; index++) {
      subs[index].update();
    }
  }
}

export function remove<T>(array: T[], item: T) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
}
