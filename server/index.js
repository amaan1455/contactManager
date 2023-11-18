const express = require('express')
const mongoose = require('mongoose')
const connectDB = require("./config/db")
const cors = require("cors")
const auth = require("./middleware/auth")
require("dotenv").config({ path: "./config/config.env" })
const app = express()
app.use(cors())
app.use(express.json())
app.get("/protected", auth, (req, res) => {
    return res.status(200).json({ user: req.user })
})
app.get("/", (req, res) => {
    res.send("hello world")
})
app.use("/api", require("./routes/auth"))
app.use("/api", require("./routes/contact"))
const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
    await connectDB()
    console.log(`server listening on port: ${PORT}`)
})