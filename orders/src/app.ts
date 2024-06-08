import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import cookieSession from "cookie-session"
import { currentUser } from "@manish-npm-common-micro/odd"
import orderCreateRouter from "./routes/new"
import Ticket from "./model/ticket"
import { Order } from "./model/order"
const app = express()

dotenv.config()

app.set("trust proxy", true)
app.use(cors())
app.use(bodyParser.json())
app.use(
      cookieSession({
            signed: false,
            secure: process.env.NODE_ENV !== 'test'
      })
);
app.use(currentUser)
app.use(orderCreateRouter)
app.get("/api/orders", async (req, res) => {
      const tickets = await Order.find({})
      res.status(200).json({
            tickets
      })
})
export default app