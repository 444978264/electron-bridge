const bridge = require('electron-bridge');
const {app, BrowserWindow} = require('electron');

console.log(bridge, 'bridge');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile('index.html');
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  // const test = new Service({
  //   test(name: string) {
  //     return Promise.resolve(name);
  //   },
  // });
  // serve.registerService('windowManage', new Service());
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
