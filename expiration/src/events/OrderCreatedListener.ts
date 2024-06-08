import { Listener, OrderCreatedEvent, Subjects } from "@manish-npm-common-micro/odd"
import { Message } from "node-nats-streaming"
import expirationQueue from "./queue"
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
      subject: Subjects.OrderCreated = Subjects.OrderCreated
      queueGroupName = "order-created"
      async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
            const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
            const resp = await expirationQueue.add({
                  orderId: data.id
            }, {
                  delay
            }
            )
            console.log(resp.data, "bull");
            msg.ack()
      }
}