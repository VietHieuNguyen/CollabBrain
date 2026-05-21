import {Router} from "express"
const router = Router()
import * as middleware from "../../middlewares/client/auth.middleware"
import * as ratelimit  from "../../middlewares/client/rateLimit.middleware"
import * as controller from "../../controllers/client/friend.controller"

router.get("/",ratelimit.authIpLimiter,middleware.authMiddleware, controller.friendList )
router.patch("/accept/:userId",ratelimit.authIpLimiter,middleware.authMiddleware,controller.acceptFriendPost)
router.delete("/reject/:userId",ratelimit.authIpLimiter,middleware.authMiddleware,controller.rejectFriendPost)
export const friendRoutes = router