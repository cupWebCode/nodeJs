import { Injectable, NestMiddleware } from '@nestjs/common';
import { environment } from 'src/environments/environment';
const cors = require('cors')

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const whitelist = environment.whiteList;
    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    }
    cors(corsOptions);
    next();
  }
}
