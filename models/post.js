const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema 

const postSchema = new mongoose.Schema({
    username:{
        type: ObjectId,
        ref:"User"
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    description:{
        type:String,
    },
    likes:[
        {
            username: {
                type:ObjectId,
                ref:"User"
            }
        }
    ],
    comments:[
        {
            username: {
                type: ObjectId,
                ref:"User"
            },

            description:{
                type: String,
                required: true,
            },
            
            date: {
                type: Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Post",postSchema)