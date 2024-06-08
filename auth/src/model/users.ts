import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { IUser } from "../interfaces/user.types";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
      email: {
            type: String,
            unique: true
      },
      password: {
            type: String,
            required: true
      }
}, {
      toJSON: {
            transform(doc, ret) {
                  delete ret._id
                  delete ret.password
                  return ret
            }
      }
})
userSchema.pre("save", async function (next) {
      if (!this.isModified("password")) {
            next()
      }
      this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.matchPassword = async function (password: string) {
      return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken = function () {
      return jwt.sign({
            id: this._id,
            email: this.email
      },
            process.env.JWT_KEY as string
      )
}
const User = mongoose.model<IUser>("Users", userSchema)
export default User