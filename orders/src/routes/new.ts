import { Request, Response, Router } from "express";
import { checkAuth } from "@manish-npm-common-micro/odd"
import { Order } from "../model/order";
import { OrderPublisher } from "../events/OrderPublisher";
import natsWrapper from "../nats/warpper";
const orderCreateRouter = Router()

orderCreateRouter.post("/api/orders", checkAuth, async (req: Request, res: Response) => {
      try {
            const { ticketId } = req.body
            const order = await Order.create({
                  userId: req.currentUser.id,
                  ticket: ticketId,
            })
            new OrderPublisher(natsWrapper.getClient).publish({
                  id: order.id,
                  ticketId: order.ticket,
                  userId: order.id,
                  expiresAt: order.expiresAt,
                  status: order.status
            })
            return res.status(201).json({
                  order
            })
      } catch (error) {
            return res.status(500).json({
                  error: (error as Error).message
            })
      }
})
export default orderCreateRouter