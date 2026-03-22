const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function handleRegisterController(req,res){

    const {email,username,password,bio,profile_image} = req.body
    // //check email already exists
    // const emailAlreadyExists = await userModel.findOne({email})
    // if(emailAlreadyExists){
    //     return res.status(409).json({
    //         message:"Email already taken!"
    //     })
    // }
    // //check username already exists
    // const usernameAlreadyExist =  await userModel.findOne({username})
    // if(usernameAlreadyExist){
    //     return res.status(409).json({
    //         message:"Username already taken!"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists with " + `${isUserAlreadyExists.email == email?"email":"username"}`
        })
    }

    //password hashing
    const hashedPassword = crypto.createHash("sha256").update(password).digest('hex')


    //create user
    const user = await userModel.create({
        email,
        username,
        bio,
        password:hashedPassword,
        profile_image
    })

    //create token
    const token = jwt.sign({
        id:user._id,
        email:user.email,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:'1d'})

    //set a token
    res.cookie("token",token);

    return res.status(201).json({
        message:"user created successfully",
        user:{
            email:user.email,
            username:user.username,
            token
        }
    })

}

module.exports = {handleRegisterController}