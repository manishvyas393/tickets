import { OrderCreatedEvent, Publisher, Subjects } from "@manish-npm-common-micro/odd"
export class OrderPublisher extends Publisher<OrderCreatedEvent> {
      subject: Subjects.OrderCreated = Subjects.OrderCreated
}