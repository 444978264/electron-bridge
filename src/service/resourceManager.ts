import {Broadcast} from './Broadcast';
const Injectable = (): ClassDecorator => target => {};
@Injectable()
export class ResourceManager {
  static readonly channel = 'resource';
  constructor(private _eventBus: Broadcast) {}
  log() {
    this._eventBus.log();
  }
}
