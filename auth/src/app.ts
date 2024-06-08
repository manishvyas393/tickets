import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import newUserRoute from "./routes/new"
import loginRoute from "./routes/login"
import cookieSession from "cookie-session"
import getUserRoute from "./routes/get"
import logOutRoute from "./routes/signout"
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
app.use(loginRoute)
app.use(newUserRoute)
app.use(getUserRoute)
app.use(logOutRoute)


export default app