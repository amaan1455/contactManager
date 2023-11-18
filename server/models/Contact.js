const mongoose = require('mongoose')
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
const Contact = new mongoose.model("Contact", ContactSchema)
module.exports = Contact