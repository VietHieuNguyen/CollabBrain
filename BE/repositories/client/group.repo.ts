import prisma from "../../config/prisma"
import { groupTypeData } from "../../types/client/group.types"

export const findGroupByKeyword = async (myId: string, keyword: string) => {
  return prisma.group.findMany({
    where: {
      OR: [
        { name: { contains: keyword, mode: "insensitive" } },
        { description: { contains: keyword, mode: "insensitive" } }
      ],
      visibility: {
        in: ["PUBLIC", "INVITE"]
      },
      isActive: true,
      isDeleted: false
    }

  })
}

export const createGroup = async (data: groupTypeData, ownerId: string) => {
  return prisma.group.create({
    data: {
      name: data.name,
      avatarUrl: data.avatarUrl,
      description: data.description,
      members: {
        create: {
          userId: ownerId,
          role: "OWNER",
        }
      }
    },

  })
}
export const getMyListGroup = async (myId: string, keyword?: string) => {
  return prisma.group.findMany({
    where: {
      members: {
        some: {
          userId: myId
        }
      },
      isActive: true,
      isDeleted: false,
      ...(keyword ?
        {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } }
          ]
        } : {})
    }
  })
}