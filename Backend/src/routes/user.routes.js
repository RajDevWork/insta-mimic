const express = require("express")
const authController = require("../controller/user.controller")

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


module.exports = authRouter