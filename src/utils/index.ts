import {Observable, shareReplay} from 'rxjs';

type IParams<T> = T extends (...args: infer P) => any ? P : never;

export function createChannel<R extends NodeJS.EventEmitter>(emitter: R) {
  return function <T, C extends IParams<R['on']>[0]>(channel: C) {
    return new Observable<{
      event: IParams<IParams<R['on']>[1]>[0];
      data: T;
    }>(observer => {
      const handle: IParams<R['on']>[1] = (
        e: IParams<IParams<R['on']>[1]>[0],
        data: T,
      ) => {
        observer.next({
          event: e,
          data,
        });
      };
      emitter.on(channel, handle);
      return () => {
        emitter.removeListener(channel, handle);
      };
    }).pipe(shareReplay({refCount: true, bufferSize: 1}));
  };
}
