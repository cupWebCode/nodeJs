import EventEmitter from 'events';
import { Service } from 'typedi';

const logHandler = (err: NodeJS.ErrnoException) => {
  process.stdout.write(`======== Error has occurred ======== \ncode - ${err.code} \nmessage - ${err.message} \n====================================`);
}

@Service()
export class ErrorLogger extends EventEmitter {
  constructor() {
    super();
  }

  log(eventName: string, error: NodeJS.ErrnoException): void {
    this.emit(eventName, error);
  }

  subscribe(eventName: string): void {
    const maxListeners = this.getMaxListeners();
    if (this.listenerCount(eventName) < maxListeners) {
      this.on(eventName, logHandler);
      return;
    }

    process.stdout.write(`EXCEEDED MAXIMUM LISTENER COUNT. MAXIMUM IS ${maxListeners}`);
  }
}
