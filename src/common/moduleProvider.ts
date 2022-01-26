import 'reflect-metadata';
import {ILifeCycle} from '../service/LifeCycle';

export interface Constructor<T, U extends string> {
  readonly channel: U;
  new (...args: any[]): T & ILifeCycle;
}

type IChannel<T> = T extends {
  channel: infer U;
}
  ? U
  : any;

type IServiceManager<T> = {
  [k in keyof T]: IChannel<T[k]>;
};

type IServiceChannel<T> = T extends Array<infer P> ? P : any;

type IService<T, U> = T extends [infer P, ...infer R]
  ? P extends {
      readonly channel: any;
      new (...args: any[]): infer O;
    }
    ? P['channel'] extends U
      ? O
      : IService<R, U>
    : never
  : never;

export class ModuleProvider<
  T extends Constructor<any, any>[],
  U = IServiceChannel<[...IServiceManager<T>]>,
> {
  static readonly container = new WeakMap();
  static provider(ctor: Constructor<any, any>) {
    return Reflect.getMetadata('design:paramtypes', ctor);
  }
  private serviceMap = new Map<U, Constructor<any, any>>();
  private serviceManager = new Map<U, IService<T, U>>();

  constructor(...args: T) {
    args.forEach(ctor => {
      this.serviceMap.set(ctor.channel, ctor);
    });
  }

  public use<R extends Constructor<any, any>>(
    target: R,
  ): IService<T, R['channel']> {
    const providers = ModuleProvider.provider(target);

    if (
      this.serviceManager.has(target.channel) &&
      !ModuleProvider.container.has(target)
    ) {
      throw new Error(`name[${target.channel}] already exists`);
    }

    const args = providers.map((ctor: Constructor<any, any>) => {
      if (ModuleProvider.container.has(ctor)) {
        return ModuleProvider.container.get(ctor);
      }
      const provider = new ctor();
      ModuleProvider.container.set(ctor, provider);
      return provider;
    });

    const service = new target(...args);

    ModuleProvider.container.set(target, service);

    this.serviceManager.set(target.channel, service);

    return service;
  }

  service<O extends U>(name: O): IService<T, O> {
    if (this.serviceManager.has(name)) {
      return this.serviceManager.get(name)!;
    }

    if (this.serviceMap.has(name)) {
      return this.use(this.serviceMap.get(name)!);
    }

    throw new Error(`no service found`);
  }

  destroy() {
    this.serviceManager.forEach((service: ILifeCycle) => {
      service.beforeQuit?.();
      service.willQuit?.();
      service.quit?.();
    });
    this.serviceManager.clear();
  }
}
