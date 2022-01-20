import {ILifeCycle} from './lifecycle';

export interface IServiceBase {
  displayName: string;
  new (...args: any): ILifeCycle;
}

export class Service<T> {
  constructor(d: T) {}
}
