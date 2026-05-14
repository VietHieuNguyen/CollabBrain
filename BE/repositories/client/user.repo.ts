import prisma from "../../config/prisma"

export const findUserByEmail = async (email: string) => {
  return prisma.user.findFirst({ where: { email: email, isDeleted: false, isActive: true } })
}

export const createUser = async (data: {
  email: string,
  passwordHash: string,
  name: string
}) => {
  return prisma.user.create({data})
}
export const saveOTP = ({email, otp, expiresAt}:{email: string, otp: string, expiresAt: Date})=>{
  return prisma.otpVerification.create({ data: { email, otp, expiresAt } });

}
export const findOTPByEmail = (email:string)=>{
  return prisma.otpVerification.findUnique({where:{email: email}})
}
export const deleteOTP = (email: string)=>{
  return prisma.otpVerification.delete({where:{email}})
}