import { Response, Router, Request } from "express";
import { body } from "express-validator";
import User from "../model/users";
import { IUser } from "../interfaces/user.types";
const loginRoute = Router()

loginRoute.post("/api/users/signin",
      [
            body("email").isEmail().withMessage("email must be a valid"),
            body("password").trim().isEmpty().isLength({ min: 4, max: 20 }).withMessage("password should not be empty it should have length more then 8"),
      ],
      async (req: Request, res: Response) => {
            try {
                  const { email, password } = req.body
                  const userExist = await User.findOne({ email }).select("+password") as IUser
                  if (!userExist) {
                        return res.status(400).json({
                              error: 'user not found'
                        })
                  }
                  const passWordMatched = userExist.matchPassword(password)
                  const token = userExist.generateToken()
                  if (passWordMatched) {
                        req.session = {
                              jwt: token
                        }
                        return res.status(200).json({
                              user: userExist
                        })
                  }
                  return res.status(400).json({
                        error: 'invalid credentials'
                  })
            } catch (error) {
                  const message = (error as Error).message
                  return res.status(500).json({
                        error: message
                  })
            }
      }
)
export default loginRoute