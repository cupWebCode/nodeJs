import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenGeneratorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): any {
    const secret = 'secret';
    const refreshTokenSecret = 'refreshTokenSecret';
    const expiresIn = 20;
    const refreshTokenExpiresIn = 86400;

    const postData = req.body;
    const claims = {
        "firstName": postData.email
    }

    const token = jwt.sign(claims, secret, { expiresIn});
    const refreshToken = jwt.sign(claims, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn})

    req.body.access_token = token;
    req.body.refresh_token = refreshToken;
    next();
  }
}
