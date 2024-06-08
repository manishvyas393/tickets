import { Listener, TicketUpdatedEvent, Subjects } from "@manish-npm-common-micro/odd"
import { Message } from "node-nats-streaming"
import Ticket from "../model/ticket"
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
      subject: Subjects.TicketUpdated = Subjects.TicketUpdated
      queueGroupName: string = "ticket-updated"
      async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
            const ticket = await Ticket.findOne({
                  _id: data.id,
                  version: data.version - 1,
            })
            if (!ticket) {
                  throw new Error("Ticket not found")
            }
            ticket.set({
                  title: data.title,
                  price: data.price
            })
            console.log(ticket)
            msg.ack()
      }
}