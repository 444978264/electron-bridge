import {ipcRenderer} from 'electron';
import {IRequest} from './common/protocol';
import {createChannelService} from './utils';

let id = 0;
export class IPCRenderer {
  public channelService = createChannelService(ipcRenderer);
  constructor() {
    ipcRenderer.send('hello');
    ipcRenderer.on('hello', () => {});
  }

  send<T extends Omit<IRequest, 'channel'>>(channel: string, data: T) {
    ipcRenderer.send(channel, {...data, channel});
  }

  call<T>(channel: string, data: T) {}

  subscribe(channel: string) {
    return this.channelService(channel).subscribe(res => {});
  }
}
