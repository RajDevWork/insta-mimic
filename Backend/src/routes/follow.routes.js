const express = require('express')
const followController = require("../controller/follow.controller")
const indentifyUser = require("../middlewares/auth.middleware")

const followRouter = express.Router()

/**
 * @route POST /api/users/follow/
 * @desc Follow the user
 * @access private
 */

followRouter.post("/follow/:username",indentifyUser,followController.followUserControler)

/**
 * @route POST /api/users/unfollow/
 * @desc Unfollow the user
 * @access private
 */
followRouter.post("/unfollow/:username",indentifyUser,followController.unfollowUserController)



module.exports = followRouter