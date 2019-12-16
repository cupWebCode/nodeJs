import * as Joi from "@hapi/joi";
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
  ExpressJoiInstance
} from "express-joi-validation";

export interface UserBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  };
}

export const userValidator: ExpressJoiInstance = createValidator();
export const userBodySchema = Joi.object({
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
});
