import EventEmitter from 'events';

const _eventEmitter = new EventEmitter();

const _logHandler = (e) => {
  if (e instanceof Error) {
    console.log(`======== Error has occurred ======== \ncode - ${e.code} \nmessage - ${e.message} \n====================================`);
  }
}

export class ErrorLogger {
  constructor() {
  }

  log(eventName, error) {
    _eventEmitter.emit(eventName, error);
  }

  subscribe(eventName) {
    _eventEmitter.on(eventName, _logHandler);
  }
}
