import nats, { Stan } from "node-nats-streaming";
class NatsWrapper {
      private _client?: Stan
      get getClient() {
            if (!this._client) {
                  throw new Error("nats not connected")
            }
            return this._client
      }
      connect(clusterId: string, clientId: string, url: string) {
            this._client = nats.connect(clusterId, clientId, { url })
            return new Promise((resolve, reject) => {
                  this._client!.on("connect", (re) => {
                        console.log("nats connected")
                        resolve(re);
                  })
                  this._client!.on("error", (err) => {
                        console.log("err", err)
                        reject(err)
                  })
            })
      }
}
const natsWrapper = new NatsWrapper()
export default natsWrapper