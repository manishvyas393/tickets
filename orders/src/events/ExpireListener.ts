import { Listener, ExpirationCompleteEvent, Subjects } from "@manish-npm-common-micro/odd"
import {Message} from "node-nats-streaming"
export class ExpireListener extends Listener<ExpirationCompleteEvent> {
      subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
      queueGroupName = "order-expire"
      async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
           console.log(data,Subjects.ExpirationComplete)
     }
}
