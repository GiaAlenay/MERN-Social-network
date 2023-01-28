import { Router } from "express";
import { getFeedPost,getUserPosts,likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";
const postRouter=Router()

postRouter.get("/",verifyToken,getFeedPost)
postRouter.get("/:id/posts",verifyToken,getUserPosts)

postRouter.patch("/:id/like",verifyToken,likePost)

export default postRouter;