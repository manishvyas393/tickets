import mongoose from "mongoose"
import app from "./app"
import natsWrapper from "./nats/warpper"
import { OrderCreatedListener } from "./events/OrderListener"
import { ExpireListener } from "./events/expireListener"
const PORT = 4001
async function start() {
      if (!process.env.MONGO_URI) {
            throw new Error("mongo uri is not defined")
      }
      if (!process.env.JWT_KEY) {
            throw new Error("jwt key must be provided")
      }
 
      await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID as string,
            process.env.NATS_CLIENT_ID as string,
            process.env.NATS_URL as string
      );
      new OrderCreatedListener(natsWrapper.getClient).listen()
      new ExpireListener(natsWrapper.getClient).listen()
      await mongoose.connect(process.env.MONGO_URI).then((res) => console.log(res.version)).catch((err) => console.log(err))
}
start()
app.listen(PORT, () => console.log(`server running on port:${PORT}`))