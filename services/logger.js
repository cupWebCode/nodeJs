import EventEmitter from 'events';

const _logHandler = (e) => {
  if (e instanceof Error) {
    console.log(`======== Error has occurred ======== \ncode - ${e.code} \nmessage - ${e.message} \n====================================`);
  }
}

export class ErrorLogger extends EventEmitter {
  constructor() {
    super();
  }

  log(eventName, error) {
    this.emit(eventName, error);
  }

  subscribe(eventName) {
    if (this.listenerCount() < this.getMaxListeners()) {
      this.on(eventName, _logHandler);
      return;
    }
    console.warn('EXCEEDED MAXIMUM LISTENER COUNT');
  }
}
