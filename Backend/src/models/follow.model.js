const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'Follower id is required'],
        ref:'users'
    },
    followee:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'Followee id is required'],
        ref:'users'
    }
},{
    timestamps:true
})

const followModel = mongoose.model('follows',followSchema)

module.exports = followModel