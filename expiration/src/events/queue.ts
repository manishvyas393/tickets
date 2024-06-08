import bull from "bull"
import { ExplirePulisher } from "./ExpirePublisher"
import NatsWrapper from "../nats"

const expirationQueue = new bull("order-expire", {
      redis: process.env.REDIS_HOST
})
expirationQueue.process((job) => {
      console.log(job)
      new ExplirePulisher(NatsWrapper.getClient).publish({
            orderId: job.data.orderId
      })
})
export default expirationQueue