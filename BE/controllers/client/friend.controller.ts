import { Request, Response } from "express"
import { acceptFriendPostService, getListFriendService, rejectFriendPostService } from "../../services/client/friend.service"

export const friendList = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user.id
    const result = await getListFriendService(id)
    res.status(200).json({
      data: result.data,
      code: 200,
      message: result.message
    })
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Có lỗi xảy ra vui lòng thử lại"
    })
  }
}

export const acceptFriendPost = async (req: Request, res: Response)=>{
  try {
    
    const myId = (req as any).user.id
    const senderId: string = req.params.userId as string
    const result = await acceptFriendPostService(senderId,myId,"ACCEPTED")
    res.status(200).json({
      data: result.data,
      code: 200,
      message: result.message
    })
  } catch (error: any) {
    res.status(400).json({
      code: 400,
      message: `Lỗi: ${error.message}`
    })
  }
}
export const rejectFriendPost = async(req: Request, res: Response)=>{
  try {
     const myId = (req as any).user.id
    const senderId: string = req.params.userId as string
    const result = await rejectFriendPostService(senderId,myId)
    res.status(200).json({
      code: 200,
      message: "Xóa thành công"
    })
  } catch (error:any) {
    res.status(400).json({
      code: 400,
      message: `Lỗi: ${error.message}`
    })
  }
}