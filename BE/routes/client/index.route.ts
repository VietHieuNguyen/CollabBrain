import { Application } from "express";
import { userRoutes } from "./user.route";
import { friendRoutes } from "./friend.route";
import { chatRoutes } from "./chat.route";

const clientRoutes = (app: Application)=>{
app.use("/user", userRoutes)
app.use("/friend", friendRoutes)
app.use("/chat",chatRoutes)
}
export default clientRoutes;