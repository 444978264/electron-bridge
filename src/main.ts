import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {ServiceModule} from './common/serviceModule';
import {IPCMain} from './ipc.main';

const sender = new IPCMain().sender;
console.log(sender);
const serviceModule = new ServiceModule();

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
