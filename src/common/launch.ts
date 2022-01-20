import {ILifeCycle} from './lifecycle';

type IMultipleServiceTuple<T> = {
  [k in keyof T]: IService<T[k]>;
};

type IService<T> = T extends {
  displayName: string;
  new (...args: infer P): ILifeCycle;
}
  ? P['length'] extends 0
    ? T
    : [T, P]
  : T extends [...infer U]
  ? IService<U[0]>
  : never;

export class Launch<T> {
  static serviceContainer = new Map<string, []>();
  static providers<T extends any[]>(args: [...IMultipleServiceTuple<T>]) {
    // const [ctor, ...params] = args;
  }
}

class Test {
  static displayName = 'haha';
  constructor(d: number) {}
  //   constructor() {}
}

Launch.providers([
  class {
    static displayName = 'haha';
    // constructor(d: number) {}
  },
  [
    class {
      static displayName = 'haha';
      constructor(d: number) {}
    },
    [1],
  ],
]);
