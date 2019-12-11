import express from 'express';
import { DependencyInjector } from './dependencyInjector';
import { Container as di } from 'typedi';
import { Logger } from './logger';

export class Loaders {
  private logger: Logger = di.get(Logger);

  constructor(public expressApp: express.Application) {
    this.init();
  }

  init() {
    try {
      new DependencyInjector();
    } catch (e) {
      this.logger.instance.error(e);
      throw e;
    }
  }
}
