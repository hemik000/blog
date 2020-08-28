const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const profileSchema = new mongoose.Schema({

    user:{
        type:ObjectId,
        ref:"User"
    },
    description:{
        type:String,

    },
    userpost:{
        type:ObjectId,
        ref:"Post"
    }
})

module.exports = mongoose.model("Profile", profileSchema)