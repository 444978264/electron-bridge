import {ipcMain, IpcMainEvent} from 'electron';
import path from 'path';
import {createChannelService, ISender} from './utils';

const filePath = path.resolve(__dirname, './');

console.log(filePath, 'filePath');

export class IPCMain {
  public sender: ISender<IpcMainEvent>;
  // private _protocol;
  constructor() {
    this.sender = createChannelService(ipcMain);
  }
}
