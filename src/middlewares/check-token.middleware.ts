import { Injectable, NestMiddleware, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { environment } from 'src/environments/environment';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  async use(@Req() req: Request, @Res() res: Response, next: () => void) {
    
    let access_token = req.headers['x-access-token'] as string;
    const secret = 'secret';

    if (access_token) {
      jwt.verify(access_token, secret, function(err) {
        if (err && err.hasOwnProperty('expiredAt')) {
          return res.status(401)
            .json({ success: false, message: 'Access token has expired' });
        } 
        if (err) {
          return res.status(403)
            .json({ success: false, message: 'Failed to authenticate token.' });
        }
        
        next();
      });
    } else {
      res.status(401).send({ success: false, message: 'No token provided.' }).end();
    }
  }
}
