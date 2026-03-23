const express = require("express")
const postController = require("../controller/post.controller")
const multer = require("multer")
const postRouter = express.Router()

const upload = multer({storage:multer.memoryStorage()})



/** 
 * @route POST /api/posts
 * @desc Create a new post
 * @access Private
 */
postRouter.post("/",upload.single("image"),postController.createPostController)




module.exports = postRouter