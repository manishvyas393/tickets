import { Publisher, Subjects, TicketCreatedEvent } from "@manish-npm-common-micro/odd"


export class TicketPublisher extends Publisher<TicketCreatedEvent> {
      subject: Subjects.TicketCreated = Subjects.TicketCreated
}