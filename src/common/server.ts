import {IpcMain, IpcRenderer} from 'electron';
import {createChannelService} from '../utils';
import {IRequest} from './protocol';

export class Server<T extends IpcMain | IpcRenderer> {
  public channelService = createChannelService(this.sender);
  constructor(public sender: T) {}

  send<T extends Omit<IRequest, 'channel'>>(channel: string, data: T) {
    // this.sender.send(channel, data);
  }

  call<T>(channel: string, data: T) {
    return this.channelService(channel).subscribe(res => {});
  }

  // subscribe(channel: string) {
  //   this.sender(channel).subscribe()
  // }
}
