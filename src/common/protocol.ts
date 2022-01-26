import {ipcMain, IpcMainEvent} from 'electron';
import {Observable, Subscription} from 'rxjs';
import {Broadcast} from '../service/Broadcast';

// response
export enum IResponseType {
  hello = 1000, // 建立连接
  responseSuccess = 1001, // 请求成功
  subscribeSuccess = 1002, // 订阅成功
  subscribeEmit = 1003, // 广播
  responseError = 1004, // 请求失败
}

export type IResponseSuccess<T> = {
  type: IResponseType.responseSuccess;
  id: number;
  data: T;
};

export type IEventEmit<T> = {
  type: IResponseType.subscribeEmit;
  id: number;
  data: T;
};

export type IResponseFailed = {
  type: IResponseType.responseError;
  id: number;
  message: string;
};

export type IResponse<T = any> =
  | IResponseSuccess<T>
  | IResponseFailed
  | IEventEmit<T>;

// request
export enum IRequestType {
  subscribe,
  unsubscribe,
  promise,
  promiseCancel,
}

export type IRequestPromise<T> = {
  type: IRequestType.promise;
  channel: string;
  data: T;
};

export type IRequestPromiseCancel = {
  type: IRequestType.promiseCancel;
  channel: string;
};

export type IRequestSubscribe<T> = {
  type: IRequestType.subscribe;
  channel: string;
  data: T;
};

export type IRequestUnSubscribe<T> = {
  type: IRequestType.unsubscribe;
  channel: string;
};

export type IRequest<T = any> =
  | IRequestPromise<T>
  | IRequestPromiseCancel
  | IRequestSubscribe<T>
  | IRequestUnSubscribe<T>;

export class Protocol extends Subscription {
  static readonly HELLO = 'ipc:hello';
  constructor() {
    super();
    new Observable<IRequest>(observer => {
      const listen = ({sender}: IpcMainEvent, data: IRequest) => {
        // observer.next({
        //   sender,
        //   data,
        // });
      };
      ipcMain.on(Protocol.HELLO, listen);
      return () => {
        ipcMain.removeListener(Protocol.HELLO, listen);
      };
    });
  }
}
