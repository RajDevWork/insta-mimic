const express = require('express');
const cookieParser = require("cookie-parser")


const app = express();
app.use(express.json());
app.use(cookieParser())

/**
 * @desc Importing routes
 */
const authRouter = require("./routes/user.routes")
const postRouter = require("./routes/post.routes")

/**
 * @desc Using routes
 */
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)


module.exports = app;