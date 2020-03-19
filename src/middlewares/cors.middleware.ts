import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import * as environment from '../environments/environment';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    const origin = req.headers.origin as string;
    const validOrigins = (environment[process.env.NODE_ENV] || environment['dev']).whiteList;
    if (validOrigins.indexOf(origin) != -1) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    }
    next();
  }
}
