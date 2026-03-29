const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserControler(req,res){
    const followerusername = req.user.username
    const followeeusername = req.params.username


    // console.log("follower = ",follower, "followee = ",followee)

    //checck if follow and followee are same

    if(followerusername.toString() === followeeusername){
        return res.status(400).json({
            message:"You can not follow yourself"
        })
    }

    //check if the followee is valid or not
    const isValidFollowee = await userModel.findOne({username:followeeusername})
    if(!isValidFollowee){
        return res.status(404).json({
            message:"User not found to follow"
        })
    }

    //check for already followed or not
    const followeeUser = await followModel.findOne({follower:followerusername,followee:followeeusername})
    if(followeeUser){
        return res.status(200).json({
            message:"You have already followed "+followeeusername,
            followeeUser
        })
    }

    const followingUser = await followModel.create({
        follower:followerusername,
        followee:followeeusername
    })

    res.status(201).json({
        message:"You are now following "+followeeUser.username,
        user:followingUser
    })



}

async function unfollowUserController(req,res){
    const followerusername = req.user.username
    const followeeusername = req.params.username

    //checck if follow and followee are same

    if(followerusername.toString() === followeeusername){
        return res.status(400).json({
            message:"You can not unfollow yourself"
        })
    }

    //check if the followee is valid or not
    const isValidFollowee = await userModel.findOne({username:followeeusername})
    if(!isValidFollowee){
        return res.status(404).json({
            message:"User not found to unfollow"
        })
    }
    //check is following
    const isFollowing = await followModel.findOne({follower:followerusername,followee:followeeusername})
    if(!isFollowing){
        return res.status(400).json({
            message:"You are not following this user"
        })
    }

    //delete user
    await followModel.findByIdAndDelete(isFollowing._id)
    res.status(200).json({
        message:"You are now unfollowing "+followeeusername
    })

}





module.exports = {
    followUserControler,
    unfollowUserController
}


