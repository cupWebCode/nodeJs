import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { Service } from "typedi";

const validationVariants = {
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string()
    .required()
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/),
  age: Joi.number()
    .required()
    .min(4)
    .max(130),
  isDeleted: Joi.boolean().required()
};

const sortValidation = {
  limit: Joi.number(),
  loginSubstring: Joi.string()
};

const createSchema = (
  itemSchema: string[],
  validationFactory: Object
): Joi.ObjectSchema => {
  let schema = Joi.object({});
  itemSchema.forEach(item => {
    if (validationFactory.hasOwnProperty(item)) {
      schema = schema.append({
        [item]: validationFactory[item]
      });
    }
  });
  return schema;
};

@Service()
export class UserValidatorService {
  checkCreateUser(req: Request, res: Response, next: NextFunction): void {
    const itemsSchema = ["id", "login", "password", "age", "isDeleted"];
    const schema = createSchema(itemsSchema, validationVariants);
    const { value, error } = Joi.validate(req.body, schema);
    if (error) {
      res.status(400).json({
        message: `Invalid request ${error.message}`
      });
    } else {
      next();
    }
  }

  checkGetUser(req: Request, res: Response, next: NextFunction): void {
    const itemsSchema = ["id"];
    const schema = createSchema(itemsSchema, validationVariants).options({
      allowUnknown: true
    });
    const { error } = Joi.validate(req.headers, schema);

    if (error) {
      res.status(400).json({
        message: `Invalid request ${error.message}`
      });
    } else {
      next();
    }
  }

  checkGetUserList(req: Request, res: Response, next: NextFunction): void {
    const itemsSchema = ["limit", "loginSubstring"];
    const schema = createSchema(itemsSchema, sortValidation).options({
      allowUnknown: true
    });
    const { error } = Joi.validate(req.headers, schema);

    if (error) {
      res.status(400).json({
        message: `Invalid request ${error.message}`
      });
    } else {
      next();
    }
  }
}
