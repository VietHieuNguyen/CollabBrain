import { Router } from "express";
import * as controller from "../../controllers/admin/auth.controller"
import * as ratelimit from "../../middlewares/admin/rateLimit.middleware"
import * as validate from "../../validates/admin/admin.validate"
const router = Router()

router.post("/login", ratelimit.authLimiter,validate.validateLoginPost, ratelimit.loginLimiter, controller.loginAdminPost)

export const authRoutes = router