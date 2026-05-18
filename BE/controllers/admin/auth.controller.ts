import { Request, Response } from "express"
import * as adminService from "../../services/admin/auth.service"
import { verifyAccessToken } from "../../helpers/jwt"

export const loginAdminPost = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const result = await adminService.authService(username, password)

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.cookie('accessToken', result.accessToken,{
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 5*60*1000
    })
    res.status(200).json({
      code: 200,
      message: "Đăng nhập thành công",
      data: {
        accessToken: result.accessToken,
        role: result.role,
        url: result.url
      }
    })
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Đăng nhập thất bại"
    })
  }
}