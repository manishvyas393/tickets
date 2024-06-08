import { Request, Response, Router } from "express";
import { checkAuth, currentUser } from "@manish-npm-common-micro/odd"

const getUserRoute = Router()

getUserRoute.get("/api/users", currentUser, checkAuth, async (req: Request, res: Response) => {
      try {
            return res.status(200).json({
                  user: req.currentUser
            })
      } catch (error) {
            return res.status(500).json({
                  user: (error as Error).message
            })
      }

})
export default getUserRoute