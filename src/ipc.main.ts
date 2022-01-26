import {ipcMain, IpcMainEvent} from 'electron';
import path from 'path';
import {WindowManager} from './service/windowManager';
import {createChannelService, ISender} from './utils';

const filePath = path.resolve(__dirname, './');

console.log(filePath, 'filePath');

export class IPCMain {
  static readonly channel = 'ipcMain';
  public channelService: ISender<IpcMainEvent>;
  constructor(private _windowManager: WindowManager) {
    this.channelService = createChannelService(ipcMain);
  }
}
