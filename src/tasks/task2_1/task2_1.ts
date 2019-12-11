import http, { Server, RequestListener, ServerResponse, IncomingMessage } from 'http';
import { Container } from 'typedi';
import express from 'express';
import { environment } from '../../config/environment';

import { ErrorLogger } from '../../../services/logger.service';

export class Task_2_1 {
  private server: Server;
  private logger = Container.get(ErrorLogger);

  private requestHandler: RequestListener = (req: IncomingMessage, res: ServerResponse) => {
    let body: Buffer[] = [];
    const { method, url, headers } = req;

    if (req.method === 'GET' && req.url === '/echo') {
      //req.pipe(res);

      console.log('method', method);
      console.log('url', url);
      console.log('headers', headers);

      // const userAgent = headers['user-agent'];
      // console.log('userAgent', userAgent);

      req
        .on('data', (chunk: Buffer) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = [Buffer.concat(body)];
          const responseBody = { headers, method, url, body };

          res.on('error', (err: Error) => this.logger.log('r_w_error', err))
            .writeHead(200, {                                                 //res.setHeader('Content-Type', 'application/json');
              'Content-Type': 'application/json',                             //,'text/html' 
              // 'X-Powered-By': 'bacon'
            })
            .write(JSON.stringify(responseBody));
          res.end();
        })
        .on('error', err => this.logger.log('r_w_error', err));
    } else {
      res.statusCode = 404;
      res.end();
    }
  }

  constructor() {
    this.initWithExpress();
    //this.init();
  }

  initWithExpress(): void {
    const app = express();
    const port: number = environment.port;

    app.get('/', (req, res) => res.send('Hello World!'))

    app.get('/echo', function (req, res, next) {
      console.log(254);
      next()
    })

    app.use(express.static('src')); //http://localhost:3000/img/img.png
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

  }

  init(): void {
    process.env
    this.logger.subscribe('r_w_error');//TODO r_w_error common name
    this.server = http.createServer();
    this.server.on('request', this.requestHandler)
      .listen(environment.port);
  }

}

//https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf