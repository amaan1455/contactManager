const mongoose = require('mongoose')
const connectDB = async () => {
    return (await mongoose.connect("mongodb://0.0.0.0:27017/contact").then(() => console.log(`db connected`)).catch((err) => console.log(err)))
}
module.exports = connectDB