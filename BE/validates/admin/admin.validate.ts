import { Request, Response,NextFunction } from "express";

const isEmpty = (value: any) => {
  return value === undefined || value === null ||
    String(value).trim() === ""
}

const errorRespone = (res: Response, message: string)=>{
  res.status(400).json({
    code: 400,
    message: message
  })
}


const validateUsername = (req: Request, res: Response)=>{
  if(isEmpty(req.body.username)){
    errorRespone(res,"Vui lòng nhập username")
    return false
  }
  return true
}
 
const validatePassword = (req: Request, res: Response)=>{
  if(isEmpty(req.body.password)){
    errorRespone(res,"Vui lòng nhập mật khẩu")
    return false
  }
  return true
}

export const validateLoginPost = (req:Request, res: Response, next: NextFunction)=>{
  if(!validateUsername(req,res)) return
  if(!validatePassword(req,res)) return
  next()
}

