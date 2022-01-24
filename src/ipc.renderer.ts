import {ipcRenderer} from 'electron';
import {IRequest} from './common/protocol';
import {createChannelService} from './utils';

let id = 0;
export class IPCRenderer {
  public channelService = createChannelService(ipcRenderer);
  // serviceManager =
  constructor() {
    ipcRenderer.send('');
  }

  send<T extends Omit<IRequest, 'channel'>>(channel: string, data: T) {
    ipcRenderer.send(channel, {...data, channel});
  }

  call<T>(channel: string, data: T) {}

  subscribe(channel: string) {
    return this.channelService(channel).subscribe(res => {});
  }
}
