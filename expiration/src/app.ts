import { OrderCreatedListener } from "./events/OrderCreatedListener"
import NatsWrapper from "./nats"
import dotenv from "dotenv"
dotenv.config()
const start = async () => {
      if (!process.env.NATS_CLIENT_ID) {
            throw new Error('NATS_CLIENT_ID must be defined');
      }
      if (!process.env.NATS_URL) {
            throw new Error('NATS_URL must be defined');
      }
      if (!process.env.NATS_CLUSTER_ID) {
            throw new Error('NATS_CLUSTER_ID must be defined');
      }
      try {
            await NatsWrapper.connect(
                  process.env.NATS_CLUSTER_ID,
                  process.env.NATS_CLIENT_ID,
                  process.env.NATS_URL
            );
            NatsWrapper.getClient.on('close', () => {
                  console.log('NATS connection closed!');
                  process.exit();
            })
            new OrderCreatedListener(NatsWrapper.getClient).listen()
            process.on('SIGINT', () => NatsWrapper.getClient.close());
            process.on('SIGTERM', () => NatsWrapper.getClient.close());
      } catch (err) {
            console.error(err);
      }
}
console.log("expire")
start()