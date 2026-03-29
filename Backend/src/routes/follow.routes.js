const express = require('express')
const followController = require("../controller/follow.controller")
const indentifyUser = require("../middlewares/auth.middleware")

const followRouter = express.Router()

/**
 * @route POST /api/follow/
 * @desc Follow the user
 * @access private
 */

followRouter.post("/:userid",indentifyUser,followController.followUserControler)





module.exports = followRouter