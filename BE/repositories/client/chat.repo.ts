import prisma from "../../config/prisma";
import { MessageType } from "@prisma/client";
export const createMessage = async(senderId: string, receiverId: string, content:string, type: MessageType="TEXT")=>{
  return prisma.message.create({
    data:{
      senderId,
      receiverId,
      content,
      type

    }
  })
}
export const getMessageBetweenUsers = async(user1Id: string, user2Id: string)=>{
  return prisma.message.findMany({
    where: {
      OR:[
        {senderId: user1Id, receiverId: user2Id},
        {senderId: user2Id, receiverId: user1Id}
      ]
    },
    orderBy:{
      createdAt: "asc"
    }
  })
}