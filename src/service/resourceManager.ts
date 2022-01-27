import {Injectable} from '../common/moduleProvider';
import {Broadcast} from './Broadcast';

@Injectable()
export class ResourceManager {
  static readonly channel = 'resource';
  constructor(private _eventBus: Broadcast) {}
  log() {
    this._eventBus.log();
  }
}
