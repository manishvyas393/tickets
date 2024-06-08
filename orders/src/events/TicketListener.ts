import { Listener, Subjects, TicketCreatedEvent } from "@manish-npm-common-micro/odd";
import { Message } from "node-nats-streaming";
import Ticket from "../model/ticket";
export class TicketListener extends Listener<TicketCreatedEvent> {
      subject: Subjects.TicketCreated = Subjects.TicketCreated
      queueGroupName: string = "ticket-created"
      async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
            const ticket = await Ticket.create({
                  _id: data.id,
                  title: data.title,
                  price: data.price,
                  userId: data.userId,
                  version: data.version,
            })
            console.log(ticket)
            msg.ack()
      }
}