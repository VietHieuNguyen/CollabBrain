import { FriendshipStatus } from "@prisma/client"
import { createFriendShip, deleteRowFriendShip, findFriendship, getListFriend, updateFriendShipStatus } from "../../repositories/client/friend.repo"

export const getListFriendService = async (id: string) => {
  const result = await getListFriend(id)
  return {
    data: result,
    message: "Lấy thành công danh sách bạn bè"
  }
}

export const acceptFriendPostService = async (senderId: string, receiverId: string, status: FriendshipStatus) => {
  
  const friendship = await findFriendship(senderId, receiverId)
  if (!friendship) throw new Error("Lời mời kết bạn không tồn tại")
  if (friendship.status !== "PENDING") throw new Error("Lời mời đã được xử lý")
  const result = await updateFriendShipStatus(senderId, receiverId, status)
  return {
    data: result,
    message: "Cập nhật trạng thái thành công"
  }
}

export const rejectFriendPostService = async (senderId: string, receiverId: string) => {
  const friendship = await findFriendship(senderId, receiverId)
  if (!friendship) throw new Error("Lời mời kết bạn không tồn tại")
  if (friendship.status !== "PENDING") throw new Error("Lời mời đã được xử lý")
  const result = await deleteRowFriendShip(senderId, receiverId)
  return {
    message: "Xóa thành công"
  }
}

export const requestFriendPostService = async (senderId: string, receiverId: string) => {
  if (senderId === receiverId) throw new Error("Không gửi được cho chính bản thân")

  const existing = await findFriendship(senderId, receiverId)
  const reverse = await findFriendship(receiverId, senderId)
  const friendship = existing || reverse

  if (friendship) {
    if (friendship.status === "BLOCKED") throw new Error("Không thể gửi lời mời kết bạn")
    if (friendship.status === "PENDING") throw new Error("Lời mời kết bạn đã tồn tại")
    if (friendship.status === "ACCEPTED") throw new Error("Đã là bạn bè")
  }

  const result = await createFriendShip(senderId, receiverId)
  return {
    data: result,
    message: "Đã gửi lời mời thành công"
  }
}


export const blockFriendPatchService = async (myId: string, targetId: string)=>{
  const existing = await findFriendship(myId, targetId)
  const reverse = await findFriendship(targetId, myId)
  const friendship = existing || reverse

  if(friendship) {
    if(friendship.status === "BLOCKED") throw new Error("Đã block người này rồi")
      const result = await updateFriendShipStatus(friendship.senderId, friendship.receiverId, "BLOCKED")
    return { data: result, message: "Block thành công" }
  }
  const result = await createFriendShip(myId, targetId)
  await updateFriendShipStatus(myId, targetId, "BLOCKED")
  return { data: result, message: "Block thành công" }
}