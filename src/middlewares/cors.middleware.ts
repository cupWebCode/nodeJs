import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { environment } from '../environments/environment';
import { Response, Request } from 'express';
const cors = require('cors')

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, next: () => void) {
    const origin = req.headers.origin as string;
    const whitelist = environment.whiteList;
    if (whitelist.indexOf(origin) != -1) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    }
    next();
  }
}
