import {Broadcast} from './Broadcast';

export class ResourceManager {
  static readonly channel = 'resource';
  constructor(private _eventBus: Broadcast) {}
}
