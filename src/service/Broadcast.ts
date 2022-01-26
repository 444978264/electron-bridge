import {filter, shareReplay, Subject} from 'rxjs';
import {IRequest} from '../common/protocol';

export class Broadcast extends Subject<IRequest> {
  static readonly channel = 'eventBus';

  constructor() {
    super();
  }

  createCommand<T>(channelService: string) {
    return this.pipe(
      filter(({channel}) => channel === channelService),
      shareReplay({bufferSize: 1, refCount: true}),
    );
  }

  emit(data: IRequest) {
    this.next(data);
    return;
  }

  log() {
    console.log('Broadcast');
  }
}
