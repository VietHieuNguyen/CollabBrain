import {Server, Socket} from "socket.io"
import { sendMessageService } from "../services/client/chat.service"
export const chatSocket = (io: Server)=>{
  io.on("connection",(socket: Socket)=>{
    const user = socket.data.user
    
    socket.join(user.id)

    socket.on("send_message", async(data)=>{
      try {
        const {receiverId, content, type="TEXT"} = data
  
        const savedMessage = await sendMessageService(user.id,receiverId,content,type)
  
        io.to(receiverId).emit("new_message",savedMessage)
      } catch (error:any) {
        socket.emit("message_error",error.message)
      }
    })
  })
}