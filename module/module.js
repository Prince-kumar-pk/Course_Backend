const  mongoose  = require('mongoose');

const schema = new mongoose.Schema(
    {
        tagName:{
            required:true,
            type:String
        },
        courseImg:{
            required:true,
            type:String
        },
        discription:{
            required:true,
            type:String
        },
        date:{
            required:true,
            type:String
        },
        duration:{
            required:true,
            type:String
        },
        vidLink:{
            required:true,
            type:String
        },
        profile:{
            required:true,
            type:String
        },
        insname:{
            required:true,
            type:String
        },
        rating:{
            required:true,
            type:String
        }
    }
)


module.exports = mongoose.model("Post", schema)

