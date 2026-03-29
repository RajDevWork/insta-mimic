const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserControler(req,res){
    const follower = req.user.id
    const followee = req.params.userid


    // console.log("follower = ",follower, "followee = ",followee)

    //checck if follow and followee are same

    if(follower.toString() === followee){
        return res.status(400).json({
            message:"You can not follow yourself"
        })
    }

    //check if the followee is valid or not
    const isValidFollowee = await userModel.findById(followee)
    if(!isValidFollowee){
        return res.status(404).json({
            message:"User not found to follow"
        })
    }

    //check for already followed or not
    const followeeUser = await followModel.findOne({follower:follower,followee:followee}).populate("followee")
    if(followeeUser){
        return res.status(200).json({
            message:"You have already following this user",
            followeeUser
        })
    }

    const followingUser = await followModel.create({
        follower:follower,
        followee:followee
    })

    res.status(201).json({
        message:"You are now following the user",
        user:followingUser
    })



}


module.exports = {
    followUserControler
}


