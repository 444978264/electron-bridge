import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {ModuleProvider} from './common/moduleProvider';
import {Broadcast} from './service/Broadcast';
import {ResourceManager} from './service/resourceManager';
import {WindowManager} from './service/windowManager';

// type Constructor<T = any> = new (...args: any[]) => T;

// const Injectable = (): ClassDecorator => target => {};

// class OtherService {
//   a = 1;
// }

// // @Injectable()
// class TestService {
//   constructor(public readonly otherService: OtherService) {}

//   testMethod() {
//     console.log(this.otherService.a, 'this.otherService');
//   }
// }

// const Factory = <T>(target: Constructor<T>): T => {
//   // 获取所有注入的服务
//   const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
//   const args = providers.map((provider: Constructor) => new provider());
//   return new target(...args);
// };

// console.log(Factory(TestService).testMethod(), 'testMethod');
// 1

console.log(Reflect.getMetadata('design:paramtypes', ResourceManager));

const provider = new ModuleProvider(Broadcast, ResourceManager, WindowManager);

// setTimeout(() => {
//   console.log(provider.service('resource'), "provider.service('resource')");
// }, 3000);

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, './bridge.js'),
    },
  });
  ipcMain.on('test', function (e, data) {
    console.log(e, data, 'ipcMain');
  });
  // Load a remote URL
  win.loadURL('http://localhost:3000');
});
