"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const typedi_1 = require("typedi");
const express_1 = __importDefault(require("express"));
const environment_1 = require("../../config/environment");
const logger_service_1 = require("../../../services/logger.service");
class Task_2_1 {
    constructor() {
        this.logger = typedi_1.Container.get(logger_service_1.ErrorLogger);
        this.requestHandler = (req, res) => {
            let body = [];
            const { method, url, headers } = req;
            if (req.method === 'GET' && req.url === '/echo') {
                //req.pipe(res);
                console.log('method', method);
                console.log('url', url);
                console.log('headers', headers);
                // const userAgent = headers['user-agent'];
                // console.log('userAgent', userAgent);
                req
                    .on('data', (chunk) => {
                    body.push(chunk);
                })
                    .on('end', () => {
                    body = [Buffer.concat(body)];
                    const responseBody = { headers, method, url, body };
                    res.on('error', (err) => this.logger.log('r_w_error', err))
                        .writeHead(200, {
                        'Content-Type': 'application/json',
                    })
                        .write(JSON.stringify(responseBody));
                    res.end();
                })
                    .on('error', err => this.logger.log('r_w_error', err));
            }
            else {
                res.statusCode = 404;
                res.end();
            }
        };
        this.initWithExpress();
        //this.init();
    }
    initWithExpress() {
        const app = express_1.default();
        const port = environment_1.environment.port;
        app.get('/', (req, res) => res.send('Hello World!'));
        app.get('/echo', function (req, res, next) {
            console.log(254);
            next();
        });
        app.use(express_1.default.static('src')); //http://localhost:3000/img/img.png
        app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    }
    init() {
        process.env;
        this.logger.subscribe('r_w_error'); //TODO r_w_error common name
        this.server = http_1.default.createServer();
        this.server.on('request', this.requestHandler)
            .listen(environment_1.environment.port);
    }
}
exports.Task_2_1 = Task_2_1;
//https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf
//# sourceMappingURL=task2_1.js.map