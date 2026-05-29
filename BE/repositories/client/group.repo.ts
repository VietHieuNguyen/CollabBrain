import prisma from "../../config/prisma"
import { groupTypeData } from "../../types/client/group.types"

export const createGroup = async (data: groupTypeData)=>{
    return prisma.group.create({
      data:data
    })
}