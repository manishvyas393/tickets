import { Listener, OrderCreatedEvent, Subjects } from "@manish-npm-common-micro/odd";
import { Message } from "node-nats-streaming";
import Ticket from "../model/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
      subject: Subjects.OrderCreated = Subjects.OrderCreated
      queueGroupName = "order-created"
      async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
            const ticket = await Ticket.findById(data.ticketId)
            ticket?.set({
                  orderId: data.id
            })
            console.log(ticket)
            msg.ack()
      }
}