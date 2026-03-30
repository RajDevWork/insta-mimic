const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

/**
 * @desc Importing routes
 */
const authRouter = require("./routes/user.routes")
const postRouter = require("./routes/post.routes")
const followRouter = require("./routes/follow.routes")

/**
 * @desc Using routes
 */
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",followRouter)


module.exports = app;