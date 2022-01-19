import {ipcMain} from 'electron';
import {Observable} from './common';

console.log(ipcMain, 'ipcMain');

export const a: Record<'aa', number> = {
  aa: 21212,
};

export const tt: Observable<any> = new Observable(observer => {
  observer.next('haha');
});

console.log(a, 'aaa');
