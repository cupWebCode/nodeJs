import { Container } from 'typedi';
//import { Container as di } from 'typedi';
import { Logger } from './logger';

export class DependencyInjector {
  private logger: Logger;

  constructor() {
    this.init();
  }

  init() {
    try {
      Container.set('logger', Logger);
      this.logger = Container.get(Logger);


    } catch (e) {
      this.logger.instance.error(e);
      throw e;
    }
  }

}