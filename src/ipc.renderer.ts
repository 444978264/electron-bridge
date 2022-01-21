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
  static readonly channel = 'hello';
  hello() {
    console.log('hello world');
  }
}

class Test {
  static readonly channel = 'world';
  constructor(public test: Test2) {
    console.log(this.test);
  }
}

console.log(new ServiceModule(Test2, Test));
