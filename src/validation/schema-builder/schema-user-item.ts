import { StringSchema } from '@hapi/joi';
import { SchemaItem } from './schema';
import Joi = require('@hapi/joi');

export class UserLogin extends SchemaItem<StringSchema> {
  constructor() {
    super('userName', Joi.string().required());
  }
}

export class UserId extends SchemaItem<StringSchema> {
  constructor() {
    super('id', Joi.string().required());
  }
}

export class UserPassword extends SchemaItem<StringSchema> {
  constructor() {
    super('password', Joi.string()
      .required()
      .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/));
  }
}

export class UserEmail extends SchemaItem<StringSchema> {
  constructor() {
    super('email', Joi.string().required()
    );
  }
}