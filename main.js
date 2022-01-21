// 在主进程中.
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, './preload.js'),
    },
  });
  ipcMain.on('test', function (e, data) {
    console.log(e, data, 'ipcMain');
  });
  // Load a remote URL
  win.loadURL('http://localhost:3000');
});
