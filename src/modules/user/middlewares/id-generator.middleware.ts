import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import * as uuidv1 from "uuid/v1";

@Injectable()
export class IdGeneratorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): any {
    req.body.id = uuidv1();
    next();
  }
}
