import { Document } from "mongoose";

export interface IUser extends Document {
      email: string,
      password: string,
      matchPassword<T>(arg: T): boolean,
      generateToken(): string
}