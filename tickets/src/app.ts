import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import createTicketRouter from "./routes/new"
import updateTicketRouter from "./routes/update"
import getTicketsRouter from "./routes/get"
import cookieSession from "cookie-session"
import { currentUser } from "@manish-npm-common-micro/odd"
const app = express()



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
app.use(createTicketRouter)
app.use(updateTicketRouter)
app.use(getTicketsRouter);
export default app