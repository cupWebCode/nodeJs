import { ObjectSchema } from '@hapi/joi';
import { Schema } from "./schema";
import { UserId, UserLogin, UserEmail, UserPassword } from "./schema-user-item";

export class SchemaUserBuilder {
  createUser<T>(): ObjectSchema<T> {
    const userSchema = new Schema<T>();

    userSchema.add(new UserId().schema);
    userSchema.add(new UserLogin().schema);
    userSchema.add(new UserPassword().schema);
    userSchema.add(new UserEmail().schema);

    return userSchema.schemaMap;
  }
}
