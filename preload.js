const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {
    ipcRenderer.send('test', 111);
  },
});
