import { Request, Response, Router } from "express";
import { checkAuth, currentUser } from "@manish-npm-common-micro/odd"
import Ticket from "../model/ticket";
import { body } from "express-validator"
import { TicketPublisher } from "../events/TicketPublisher";
import natsWrapper from "../nats/warpper";
const createTicketRouter = Router()

createTicketRouter.post("/api/ticket",
      [
            body("title").trim().isEmpty().withMessage("title should not be empty"),
            body("price").isFloat({ gt: 0 }).isEmpty().withMessage("price must be greater than 0")
      ],
      checkAuth,
      async (req: Request, res: Response) => {
            try {
                  const { title, price } = req.body
                  const ticket = await Ticket.create({
                        title,
                        price,
                        userId: req.currentUser.id
                  })
                  new TicketPublisher(natsWrapper.getClient).publish(ticket as any)
                  return res.status(201).json({
                        ticket
                  })
            } catch (error) {
                  return res.status(500).json({
                        error: (error as Error).message
                  })
            }
      })
export default createTicketRouter