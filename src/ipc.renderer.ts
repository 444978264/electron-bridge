import {ipcRenderer} from 'electron';
import {Observable, ServiceModule} from './common';

console.log(ipcRenderer, 'ipcRenderer');

export const a: Record<'aa', number> = {
  aa: 21212,
};

export const tt: Observable<any> = new Observable(observer => {
  observer.next('haha');
});

console.log(a, 'aaa');

class Test2 {
  hello() {
    console.log('hello world');
  }
}

class Test {
  constructor(public test: Test2) {
    console.log(this.test);
  }
}

ServiceModule.inject([Test2, Test]);
