import {ipcMain} from 'electron';
import {createChannel} from '../utils';

export class IPC<T extends NodeJS.EventEmitter> {
  public channelService = createChannel<T>(this.ipc);
  constructor(public ipc: T) {}
}
