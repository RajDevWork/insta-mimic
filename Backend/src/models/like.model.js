const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,'Post id is required to like'],
        ref:'posts'
    },
    user:{
        type:String,
        ref:'users',
        require:[true,'User id is required to like the post']
    }
},{
    timestamps:true
})

likeSchema.index({post:1,user:1},{unique:true})

const likeModel = mongoose.model('likes',likeSchema)

module.exports = likeModel