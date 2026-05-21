import { FriendshipStatus } from "@prisma/client"
import { deleteRowFriendShip, findFriendship, getListFriend, updateFriendShipStatus} from "../../repositories/client/friend.repo"

export const getListFriendService = async (id: string) => {
  const result = await getListFriend(id)
  return {
    data: result,
    message: "Lấy thành công danh sách bạn bè"
  }
}

export const acceptFriendPostService = async(senderId: string, receiverId: string,status: FriendshipStatus)=>{
  const friendship = await findFriendship(senderId, receiverId)
  if (!friendship) throw new Error("Lời mời kết bạn không tồn tại")
  if (friendship.status !== "PENDING") throw new Error("Lời mời đã được xử lý")
  const result = await updateFriendShipStatus(senderId,receiverId,status)
  return {
    data: result,
    message: "Cập nhật trạng thái thành công"
  }
}

export const rejectFriendPostService = async(senderId: string, receiverId: string)=>{
  const friendship = await findFriendship(senderId, receiverId)
  if (!friendship) throw new Error("Lời mời kết bạn không tồn tại")
  if (friendship.status !== "PENDING") throw new Error("Lời mời đã được xử lý")
  const result = await deleteRowFriendShip(senderId,receiverId)
  return{
    message: "Xóa thành công"
  }
}