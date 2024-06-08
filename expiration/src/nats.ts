import { Stan } from "node-nats-streaming"
import nats from "node-nats-streaming"
class natsWrapper {
      private _client: Stan
      get getClient() {
            if (!this._client) {
                  throw new Error("nats not conncted")
            }
            return this._client
      }
      connect(clusterId: string, clientId: string, url: string) {
            this._client = nats.connect(clusterId, clientId, { url })
            return new Promise<void>((resolve, reject) => {
                  this._client!.on("connect", () => {
                        console.log("nats connected")
                        resolve()
                  })
                  this._client!.on("error", (err) => {
                        console.log("err", err)
                        reject(err)
                  })
            })
      }
}
const NatsWrapper = new natsWrapper()
export default NatsWrapper