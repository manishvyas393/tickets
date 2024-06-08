import { Request, Response, Router } from "express";
import { checkAuth } from "@manish-npm-common-micro/odd"

const logOutRoute = Router()

logOutRoute.post("/api/users/logout", async (req: Request, res: Response) => {
      req.session = null
      return res.status(200).json({
            user: null
      })
})
export default logOutRoute