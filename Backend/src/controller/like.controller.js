const likeModel = require("../models/like.model")
const postModel = require("../models/post.model")

async function likePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId

    //check if post exists or not

    const isPostExists = await  postModel.findById(postId)
    if(!isPostExists){
        return res.status(404).json({
            message:"You are trying to like the post that doesn't exists"
        })
    }

    //check if the post already liked or not
    const isAlreadyLiked = await likeModel.findOne({post:postId,user:username}).populate('post')
    if(isAlreadyLiked){
        return res.status(200).json({
            message:"You have already liked this post",
            post:isAlreadyLiked
        })
    }
    //create like
    const liked = await likeModel.create({
        post:postId,
        user:username
    })

    res.status(201).json({
        message:"You have successfully liked the post",
        liked
    })

}

async function UnlikePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId

    //check if post exists or not

    const isPostExists = await  postModel.findById(postId)
    if(!isPostExists){
        return res.status(404).json({
            message:"You are trying to dislike the post that doesn't exists"
        })
    }

    //check if the post already liked or not
    const isAlreadyLiked = await likeModel.findOne({post:postId,user:username}).populate('post')
    if(!isAlreadyLiked){
        return res.status(200).json({
            message:"Post didn't like",
            post:isAlreadyLiked
        })
    }
    await likeModel.findOneAndDelete({_id:isAlreadyLiked._id})

    return res.status(200).json({
        message:"Post unliked successfully"
    })

}


module.exports = {
    likePostController,
    UnlikePostController
}