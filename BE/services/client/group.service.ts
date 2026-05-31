import { createGroup, findGroupByKeyword, getMyListGroup } from "../../repositories/client/group.repo";
import { groupTypeData } from "../../types/client/group.types";

export const creatGroupPostService = async (data: groupTypeData, ownerId: string) => {
  const result = await createGroup(data, ownerId)
  return {
    data: result,
    message: "Tạo group thành công"
  }
}


export const myGroupGetService = async (myId: string, keyword?: string) => {
  const result = await getMyListGroup(myId,keyword)
  return {
    data: result,
    message: "Thành công lấy danh sách"
  }
}

export const findGroupGetService = async(myId: string, keyword: string)=>{
  const result = await findGroupByKeyword(myId, keyword)
  return {
    data: result,
    message: "Tìm kiếm thành công"
  }
}