import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { Request } from "express";
const tooManyRequest = (message: string) => ({
  code: 429,
  message
})
const getUsernameKey = (req: Request) => {
  const username = typeof req.body.username === 'string' ? req.body.username.trim().toLowerCase() : ""
  return username ? `username: ${username}` : `ip:${ipKeyGenerator(req.ip ?? req.socket.remoteAddress ?? "")}`

}
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: tooManyRequest("Quá nhiều yêu cầu vui lòng thử lại sau 15 phút")
})

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: getUsernameKey,
  message: tooManyRequest("Đăng nhập sai quá nhiều lần, vui lòng thử lại sau 5 phút")
})