import "reflect-metadata";
import { Service } from "typedi";
import * as uuidv1 from "uuid/v1";
import { Request, Response } from "express";

@Service()
export class IdGeneratorService {
  generateId(req: Request, res: Response, next): void {
    req.body.id = uuidv1.default();
    next();
  }
}
