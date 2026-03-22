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

async function handleLoginController(req,res){
    const {email,password,username} = req.body

    //check whether email or username exists or not
    const isUserValid = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })
    if(!isUserValid){
        return res.status(404).json({
            message:'Invalid details'
        })
    }
    //check of password
    const hashedPass = crypto.createHash("sha256").update(password).digest('hex')

    const isValidPassword = hashedPass==isUserValid.password.toString()
    if(!isValidPassword){
        return res.status(404).json({
            message:'Invalid details'
        })
    }
    //create token
    const token = jwt.sign({
        id:isUserValid._id,
        email:isUserValid.email,
        username:isUserValid.username
    },process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie("token",token)

    res.status(200).json({
        message:"User loggedin successfully",
        user:{
            username:isUserValid.username,
            email:isUserValid.email,
            token
        }
    })


}

module.exports = {handleRegisterController,handleLoginController}