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

module.exports = {
    createPostController
}