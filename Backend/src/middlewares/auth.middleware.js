const jwt = require("jsonwebtoken")

const indentifyUser = (req,res,next) =>{

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Missing token, Unauthorized access."
        })
    }
    let decoded = null
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token."
        })
    }
    req.user = decoded

    next()
}

module.exports = indentifyUser