const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


/** 
 * @desc Register controller
 * @route POST /api/auth/register
 * @access Public
 */
async function handleRegisterController(req,res){

    const {email,username,password,bio,profile_image} = req.body

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

    //password hashing using bcrypt
    const hashedPassword = await bcrypt.hash(password,10)


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
/** 
 * @desc Login controller
 * @route POST /api/auth/login
 * @access Public
 */
async function handleLoginController(req,res){
    const {email,password,username} = req.body

    //check whether email or username exists or not
    const isUserValid = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    }).select("+password")
    if(!isUserValid){
        return res.status(404).json({
            message:'Invalid details'
        })
    }
    //check of password using bcrypt

    const isValidPassword = await bcrypt.compare(password,isUserValid.password)
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
async function getMeController(req,res){
    const userId = req.user.id

    const user = await userModel.findById(userId)
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    res.status(200).json({
        message:"Loggedin User details",
        user
    })
}

module.exports = {handleRegisterController,handleLoginController,getMeController}