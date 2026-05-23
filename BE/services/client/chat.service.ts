import { MessageType } from "@prisma/client";
import { findFriendship } from "../../repositories/client/friend.repo";
import { createMessage, getMessageBetweenUsers } from "../../repositories/client/chat.repo";


export const sendMessageService = async(senderId: string, receiverId: string, content: string, type: MessageType="TEXT")=>{
  const existing = await findFriendship(senderId,receiverId)
  const reverse = await findFriendship(receiverId, senderId)
  const friendShip = existing || reverse
  if(!friendShip || friendShip?.status !== "ACCEPTED") {
    throw new Error("Không thể gửi tin nhắn. Hai người chưa là bạn bè")
  }
  const newMessage = await createMessage(senderId, receiverId,content,type)

  return {
    message: "Gửi tin nhắn thành công",
    data: newMessage
  }


}
export const getChatHistoryService = async(myId: string, targetId: string)=>{
  const existing = await findFriendship(myId,targetId)
  const reverse = await findFriendship(targetId, myId)
  const friendShip = existing || reverse
  if(!friendShip || friendShip?.status !== "ACCEPTED") {
    throw new Error("Không thể xem tin nhắn. Hai người chưa là bạn bè")
  }
  const messages = await getMessageBetweenUsers(myId,targetId)
  return {
    data: messages,
    message: "Lấy lịch sử chat thành công"
  }
}