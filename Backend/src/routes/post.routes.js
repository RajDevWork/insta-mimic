const express = require("express")
const postController = require("../controller/post.controller")
const multer = require("multer")
const indentifyUser = require("../middlewares/auth.middleware")
const likeController = require("../controller/like.controller")
const postRouter = express.Router()

const upload = multer({storage:multer.memoryStorage()})



/** 
 * @route POST /api/posts
 * @desc Create a new post
 * @access Private
 */
postRouter.post("/",indentifyUser,upload.single("image"),postController.createPostController)


/** 
 * @route GET /api/posts
 * @desc Get all posts
 * @access Private
 */
postRouter.get("/",indentifyUser,postController.getPostController)

/** 
 * @route GET /api/posts/:postID
 * @desc Get a post details by matching post id and post belonging user
 * @access Private
 */
postRouter.get("/details/:postID",indentifyUser,postController.getPostDetailsController)

/** 
 * @route GET /api/posts/like/:postID
 * @desc Like the post
 * @access Private
 */
postRouter.post("/like/:postId",indentifyUser,likeController.likePostController)



module.exports = postRouter