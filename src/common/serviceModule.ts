// import {ILifeCycle} from './lifecycle';

// interface IServiceName {
//   displayName: string;
// }

// type IMultipleServiceTuple<T> = {
//   [k in keyof T]: IService<T[k]>;
// };

// type IService<T> = T extends {
//   new (...args: infer P): ILifeCycle;
// } & IServiceName
//   ? P['length'] extends 0
//     ? T
//     : [T, P]
//   : T extends [...infer U]
//   ? IService<U[0]>
//   : IServiceName;

// export class ServiceModule<T extends any[]> {
//   static provider<T extends any[]>(args: [...IMultipleServiceTuple<T>]) {}
//   public serviceContainer = new Map<string, ILifeCycle>();
//   constructor(args: [...IMultipleServiceTuple<T>]) {
//     args.forEach(item => {
//       //   if (Array.isArray(item)) {
//       //     const [ctor, params] = item;
//       //   } else {
//       //     this.serviceContainer.set(item.displayName, [item]);
//       //   }
//     });
//   }
// }

// new ServiceModule([
//   class {
//     static displayName = 'haha';
//     // constructor(d: number) {}
//   },
//   [
//     class {
//       static displayName = 'haha';
//       constructor(d: number) {}
//     },
//     [1],
//   ],
// ]);
import 'reflect-metadata';

type Constructor<T = any> = new (...args: any[]) => T;

const EMPTY_MODULE = new Set();

class ServiceModule {
  static ctorCollection = EMPTY_MODULE;

  static inject(ctors: Constructor[]) {
    if (ServiceModule.ctorCollection === EMPTY_MODULE) {
      ServiceModule.ctorCollection = new Set(ctors);
    } else {
      ctors.forEach(ctor => {
        ServiceModule.ctorCollection.add(ctor);
      });
    }
  }

  static provider(ctor: Constructor) {
    return Reflect.getMetadata('design:paramtypes', ctor);
  }

  private container = new WeakMap();

  private get(target: Constructor) {
    const providers = ServiceModule.provider(target);

    const args = providers.map((ctor: Constructor) => {
      if (this.container.has(ctor)) {
        return this.container.get(ctor);
      }
      const provider = new ctor();
      this.container.set(ctor, provider);
      return provider;
    });

    return new target(...args);
  }
}
