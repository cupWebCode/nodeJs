import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenGeneratorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): any {
    const secret = 'secret'; // TODO define env variable
    const refreshTokenSecret = 'refreshTokenSecret';// TODO define env variable
    const expiresIn = 100;// TODO define env variable
    const refreshTokenExpiresIn = 86400;// TODO define env variable <====== how much time?

    const postData = req.body;
    const claims = {
        "firstName": postData.email// TODO give user permissions?
    }

    const token = jwt.sign(claims, secret, { expiresIn});
    const refreshToken = jwt.sign(claims, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn})

    req.body.access_token = token;
    req.body.refresh_token = refreshToken;
    next();
  }
}
