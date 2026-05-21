import expess, { Express } from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middlewares/client/socket.middleware";
import { chatSocket } from "./sockets/chat.socket";
dotenv.config()
const app: Express = expess()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGINAL_URL,
    credentials: true
  }
})
app.set("io",io)

io.use(socketAuthMiddleware)
chatSocket(io)
app.use(cors({ origin: process.env.ORIGINAL_URL, credentials: true }));
app.use(cookieParser());


const PORT = process.env.PORT || 3000
app.use(expess.json())
app.use(expess.urlencoded({ extended: true }))
clientRoutes(app);
adminRoutes(app)
server.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})