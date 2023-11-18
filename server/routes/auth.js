const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "all fields required" })
    try {
        const doesUserExist = await User.findOne({ email })
        if (!doesUserExist) return res.status(400).json({ error: "User does not exit" })
        const passMatch = await bcrypt.compare(password, doesUserExist.password)
        if (!passMatch) return res.status(400).json({ error: "Password does not match" })
        const payload = { _id: doesUserExist._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
        const user = { ...doesUserExist._doc, password: undefined }
        return res.status(201).json({ token, user })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
})
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "all fields required" })
    try {
        const doesUserExist = await User.findOne({ email })
        if (doesUserExist) return res.status(400).json({ error: "User does exit" })
        const hashedPass = await bcrypt.hash(password, 12)
        const newUser = new User({ name, email, password: hashedPass })
        const result = await newUser.save()
        result._doc.password = undefined
        return res.status(201).json({ ...result._doc })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
})
router.get("/me", auth, async (req, res) => {
    return res.status(200).json({ ...req.user._doc })
})
module.exports = router