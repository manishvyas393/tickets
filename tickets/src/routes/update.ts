import { Request, Response, Router } from "express";
import { checkAuth, currentUser } from "@manish-npm-common-micro/odd"
import Ticket from "../model/ticket";
import { body } from "express-validator"
import { TicketUpdatedPublisher } from "../events/TicketUpdatedPublish";
import natsWrapper from "../nats/warpper";
const updateTicketRouter = Router()

updateTicketRouter.post("/api/ticket",
      [
            body("title").trim().isEmpty().withMessage("title should not be empty"),
            body("price").isFloat({ gt: 0 }).isEmpty().withMessage("price must be greater than 0")
      ],
      checkAuth,
      async (req: Request, res: Response) => {
            try {
                  const { title, price } = req.body
                  const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.currentUser.id })
                  ticket?.set({
                        title,
                        price
                  })
                  new TicketUpdatedPublisher(natsWrapper.getClient).publish(ticket as any)
                  return res.status(200).json({
                        ticket
                  })

            } catch (error) {
                  return res.status(500).json({
                        error: (error as Error).message
                  })
            }
      })
export default updateTicketRouter