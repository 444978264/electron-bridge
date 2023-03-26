import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {ModuleProvider} from './common/moduleProvider';
import {Broadcast} from './service/Broadcast';
import {ResourceManager} from './service/resourceManager';
import {WindowManager} from './service/windowManager';

const provider = new ModuleProvider(Broadcast, ResourceManager, WindowManager);

setTimeout(() => {
  console.log(provider.service('resource'), "provider.service('resource')");
}, 3000);

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
