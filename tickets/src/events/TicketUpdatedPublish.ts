import { Publisher, Subjects, TicketUpdatedEvent } from "@manish-npm-common-micro/odd"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
      subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}