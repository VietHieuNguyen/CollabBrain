import { Request, Response } from "express"
import { groupTypeData } from "../../types/client/group.types"
//[POST] /groups
export const createGroupPost = async(req: Request, res: Request)=>{
  let dataGroup: groupTypeData = {
    name: req.body.name,
    avatarUrl: req.body.avatarUrl,
    description: req.body.description
  }
}