const express = require("express")
const authController = require("../controller/user.controller")

const authRouter = express.Router()

authRouter.post("/register",authController.handleRegisterController)


module.exports = authRouter