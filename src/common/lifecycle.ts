import {app, BrowserWindow} from 'electron';

export interface ILifeCycle {
  beforeCreate?(): void;
  created?(): void;
  activated?(): void;
  windowCreated?(win: BrowserWindow): void;
  beforeQuit?(): void;
  willQuit?(): void;
  quit?(exitCode: number): void;
}

export class LifeCycle {
  constructor() {
    // 当应用程序完成基础的启动的时候被触发
    app.on('will-finish-launching', () => {
      // 为 open-file 和 open-url 设置监听器，并启动崩溃报告和自动更新
    });

    app.on('ready', (e, launchInfo) => {
      // Electron 完成初始化时
    });

    app.on('did-become-active', e => {
      // 程序激活时
    });

    app.on('browser-window-created', (e, win) => {
      // 在创建新的 browserWindow 时发出。
      console.log('browser-window-created');
    });

    app.on('before-quit', e => {
      //   e.preventDefault();
      console.log('before-quit');
    });

    app.on('will-quit', e => {
      //   e.preventDefault();
      console.log('before-quit');
    });

    app.on('quit', (e, exitCode) => {
      console.log('quit');
    });
  }
}
