const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userId: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String,
            unique:true
        },
        profileLink: {
            required: true,
            type: String,
            unique:true
        },
        pass: {
            required: true,
            type: String,
            min:5,
            max:10
        },
      
    }
)

module.exports = mongoose.model('User', userSchema)