const mongoose = require("mongoose")

const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const followSchema = new mongoose.Schema({
    follower:{
        type: String,
        required:[true,'Follower id is required'],
        ref:'users'
    },
    followee:{
        type: String,
        required:[true,'Followee id is required'],
        ref:'users'
    },
    status:{
        type:String,
        enum:Object.values(STATUS),
        default:STATUS.PENDING
    }
},{
    timestamps:true
})

const followModel = mongoose.model('follows',followSchema)

module.exports = followModel