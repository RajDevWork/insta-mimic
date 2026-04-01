const postModel = require("../models/post.model")
const {ImageKit, toFile } = require("@imagekit/nodejs");


/** 
 * @desc Create a new post controller
 * @route POST /api/posts
 * @access Private
 */
async function createPostController(req,res){

    const caption = req.body.caption
    const userId = req.user.id
    //upload file to cloud
    const client = new ImageKit({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
    });
    const uploadedFile = await client.files.upload({
                file: await toFile(Buffer.from(req.file.buffer), 'file'),
                fileName: req.file.originalname,
                folder:"insta-clone-mern"
                });
    

    //create post

    const post = await postModel.create({
        caption,
        imgUrl:uploadedFile.url,
        user:userId
    })


    res.status(201).json({
        message:"Post created successfully!",
        post
    })
}

/** 
 * @desc Get All post controller
 * @route GET /api/posts
 * @access Private
 */
async function getPostController(req,res){
    const userID = req.user.id

    const posts = await postModel.find({user:userID})
    if(!posts){
        return res.status(404).json({
            message:"No Post found!"
        })
    }
    res.status(200).json({
        message:"Post fetched successfully!",
        posts
    })
}
async function getPostDetailsController(req,res){
    const userID = req.user.id
    const postID = req.params.postID

    // console.log("userid = ",userID,"postID = ",postID)

    const post = await postModel.findById(postID)
    if(!post){
       return res.status(404).json({
            message:"You are trying to search a resounse that is not available!"
        })
    }
    const isValidUser = post.user.toString() === userID;
    if(!isValidUser){
       return res.status(403).json({
        message:"Forbidden content!"
       })
    }

    res.status(200).json({
        message:"Post fetched successfully!",
        post
    })

}

async function getFeedController(req,res){
    const posts = await postModel.find().sort({_id:-1}).populate('user')

    res.status(200).json({
        message:"Post fetched successfully!",
        posts
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    getFeedController
}