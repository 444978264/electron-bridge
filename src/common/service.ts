abstract class ServiceLifeCycle {
  beforeQuit?(): void;
}

export class Service implements ServiceLifeCycle {
  constructor() {
    // super();
  }
}
