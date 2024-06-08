import mongoose from "mongoose";
import app from "./app";
const PORT = 4000
async function start() {
      if (!process.env.MONGO_URI) {
            throw new Error("mongo uri must be provided")
      }
      await mongoose.connect(process.env.MONGO_URI).then((res) => console.log(res.version)).catch((err) => console.log(err)) 
}
app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`))
start()