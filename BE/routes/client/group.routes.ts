import { Router } from "express";
const router = Router()
import * as ratelimit from "../../middlewares/client/rateLimit.middleware"
import * as middleware from "../../middlewares/client/auth.middleware"
import * as controller from "../../controllers/client/group.controller"
router.post("/",ratelimit.authIpLimiter,middleware.authMiddleware,controller.createGroupPost)

router.get("/list",ratelimit.authIpLimiter,middleware.authMiddleware, controller.myGroupGet)
router.get("/search",ratelimit.authIpLimiter, middleware.authMiddleware, controller.findGroupGet)
export const  groupRoutes = router