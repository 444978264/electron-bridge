import {Injectable} from '../common/moduleProvider';
import {Broadcast} from './Broadcast';

@Injectable()
export class ResourceManager {
  static readonly channel = 'resource';
  constructor(private _eventBus: Broadcast) {
    this._eventBus.log();
  }
  log() {
    this._eventBus.log();
  }
}
