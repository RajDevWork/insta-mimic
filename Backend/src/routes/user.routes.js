const express = require("express")
const authController = require("../controller/user.controller")

const authRouter = express.Router()

authRouter.post("/register",authController.handleRegisterController)
authRouter.post("/login",authController.handleLoginController)


module.exports = authRouter