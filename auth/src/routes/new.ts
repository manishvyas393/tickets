import { Response, Router, Request } from "express";
import { body } from "express-validator";
import User from "../model/users";
const newUserRoute = Router()

newUserRoute.post("/api/users/signup",
      [
            body("email").isEmail().withMessage("email must be a valid"),
            body("password").trim().isEmpty().isLength({ min: 4, max: 20 }).withMessage("password should not be empty it should have length more then 8"),
      ],
      async (req: Request, res: Response) => {
            try {
                  const { email, password } = req.body
                  const userExist = await User.findOne({ email })
                  if (userExist) {
                        return res.status(400).json({
                              error: `${email} is in use`
                        })
                  }
                  const user = await User.create({
                        email,
                        password
                  })
                  console.log(user)
                  const token = user.generateToken()
                  req.session = {
                        token: token
                  }
                  return res.status(201).json({
                        user,
                        token
                  })
            } catch (error) {
                  console.log(error)
                  const message = (error as Error).message
                  return res.status(500).json({
                        error: message
                  })
            }
      }
)
export default newUserRoute