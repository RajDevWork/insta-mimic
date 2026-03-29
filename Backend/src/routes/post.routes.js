const express = require("express")
const postController = require("../controller/post.controller")
const multer = require("multer")
const indentifyUser = require("../middlewares/auth.middleware")
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
 * @desc Get a post by matching id
 * @access Private
 */
postRouter.get("/:postID",indentifyUser,postController.getPostByIDController)


module.exports = postRouter