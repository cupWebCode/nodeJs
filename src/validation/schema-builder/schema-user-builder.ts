import { ObjectSchema } from '@hapi/joi';
import { Schema } from "./schema";
import { UserId, UserName, UserEmail, UserPassword, UserCountry, UserMobilePhone } from "./schema-user-item";

export class SchemaUserBuilder {
  createUser<T>(): ObjectSchema<T> {
    const userSchema = new Schema<T>();

    userSchema.add(new UserId().schema);
    userSchema.add(new UserName().schema);
    userSchema.add(new UserCountry().schema);
    userSchema.add(new UserEmail().schema);
    userSchema.add(new UserMobilePhone().schema);
    userSchema.add(new UserPassword().schema);


    return userSchema.schemaMap;
  }
}
