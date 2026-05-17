import { Router } from "express";
import * as controller from "../../controllers/admin/auth.controller"
import * as ratelimit from "../../middlewares/admin/rateLimit.middleware"
const router = Router()
router.post("/login", ratelimit.authLimiter, ratelimit.loginLimiter, controller.loginAdminPost)
export const authRoutes = router