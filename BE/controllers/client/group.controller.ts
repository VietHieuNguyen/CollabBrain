import { Request, Response } from "express"
import { groupTypeData } from "../../types/client/group.types"
import { creatGroupPostService, findGroupGetService, myGroupGetService } from "../../services/client/group.service"
//[POST] /groups
export const createGroupPost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    let dataGroup: groupTypeData = {
      name: req.body.name,
      avatarUrl: req.body.avatarUrl,
      description: req.body.description
    }
    const result = await creatGroupPostService(dataGroup, userId);
    res.status(200).json({
      code: 200,
      message: result.message,
      data: result.data
    })
  } catch (error: any) {
    res.status(400).json({
      message: `Lỗi: ${error.message}`
    })
  }
}


//[GET] /groups/list
export const myGroupGet = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const keyword = req.query.keyword as string
    const result = await myGroupGetService(userId, keyword)
    res.status(200).json({
      code: 200,
      message: result.message,
      data: result.data
    })
  } catch (error: any) {
    res.status(400).json({
      message: `Lỗi: ${error.message}`
    })
  }
}

//[GET] /groups/search
export const findGroupGet = async(req: Request, res: Response)=>{
  try {
    const userId = (req as any).user.id
    const keyword = req.query.keyword as string  || ""
    const result = await findGroupGetService(userId,keyword)
  res.status(200).json({
      code: 200,
      message: result.message,
      data: result.data
    })
  } catch (error: any) {
    res.status(400).json({
      message: `Lỗi: ${error.message}`
    })
  }
}