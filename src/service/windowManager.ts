import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  WebContents,
} from 'electron';
import {Constructor, Injectable} from '../common/moduleProvider';
@Injectable()
export class WindowManager {
  static readonly channel = 'windowManager';
  private _windows = new Set<BrowserWindow>();
  private _senders = new WeakMap<any, Constructor<any, any>[]>();
  constructor() {}
  // only this services supported
  provide(sender: WebContents, services: Constructor<any, any>[]) {
    if (!this._senders.has(sender)) {
      this._senders.set(sender, services);
    }
  }

  create(
    option: BrowserWindowConstructorOptions,
    services?: Constructor<any, any>[],
  ) {
    const win = new BrowserWindow(option);
    this._windows.add(win);
    if (services && services.length) {
      this.provide(win.webContents, services);
    }
    return win;
  }
}
