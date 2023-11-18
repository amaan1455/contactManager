const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    }
})
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    message: {
        type: [MessageSchema]
    },
})
const User = new mongoose.model("User", UserSchema)
module.exports = User