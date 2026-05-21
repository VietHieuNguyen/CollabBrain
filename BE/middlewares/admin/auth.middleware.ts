import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../../helpers/jwt";
import { JwtPayload } from "jsonwebtoken";
import { findAccountById } from "../../repositories/admin/admin.repo";

interface AdminTokenPayload extends JwtPayload {
  id: string,
  role: string
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken
    if (!token) {
      return res.status(401).json({
        code: 401,
        message: "Vui lòng đăng nhập"
      })
    }
    const decoded = verifyAccessToken(token);
    if (typeof decoded === "string" || !decoded.id) {
      return res.status(401).json({
        code: 401,
        message: "Token không hợp lệ"
      })
    }
    const payload = decoded as AdminTokenPayload
    const account = await findAccountById(payload.id)
    if (!account) {
      return res.status(401).json({
        code: 401,
        message: "Token không hợp lệ"
      })
    }
    (req as any).account = account
    next()
  } catch (error: any) {
    return res.status(401).json({
      code: 401,
      message: error.message || "Token không hợp lệ"
    })
  }
}