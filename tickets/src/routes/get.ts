import { Request, Response, Router } from "express";
import { checkAuth } from "@manish-npm-common-micro/odd"
import Ticket from "../model/ticket";
const getTicketsRouter = Router()

getTicketsRouter.get("/api/ticket",
      checkAuth,
      async (req: Request, res: Response) => {
            try {
                  const tickets = await Ticket.find()
                  console.log(tickets)
                  return res.status(201).json({
                        tickets
                  })
            } catch (error) {
                  return res.status(500).json({
                        error: (error as Error).message
                  })
            }
      })
export default getTicketsRouter