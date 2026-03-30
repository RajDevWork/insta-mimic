const express = require("express")
const authController = require("../controller/user.controller")
const indentifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register",authController.handleRegisterController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login",authController.handleLoginController)


/**
 * @route POST /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
authRouter.post("/get-me",indentifyUser,authController.getMeController)



module.exports = authRouter