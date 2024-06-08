import { Listener, OrderCreatedEvent, Subjects, ExpirationCompleteEvent } from "@manish-npm-common-micro/odd";
import { Message } from "node-nats-streaming";
import Ticket from "../model/ticket";

export class ExpireListener extends Listener<ExpirationCompleteEvent> {
      subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
      queueGroupName = "order-created"
      async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
            const ticket = await Ticket.findById({ orderId: data.orderId })
            ticket?.set({
                  orderId: null
            })
            console.log(ticket)
            msg.ack()
      }
}