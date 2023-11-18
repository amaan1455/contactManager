const router = require("express").Router()
const Contact = require("../models/Contact")
const User = require("../models/User")
const auth = require("../middleware/auth")
const mongoose = require("mongoose")
router.post("/contact", auth, async (req, res) => {
    //console.log("in /contact")
    const { name, email, phone } = req.body
    if (!name || !email || !phone) return res.status(400).json({ error: "all fields required" })
    try {
        const newcontact = new Contact({ name, email, phone, postedBy: req.user._id })
        const result = await newcontact.save()
        return res.status(201).json({ ...result._doc })
    } catch (err) { console.log(err) }
})
router.put("/message", auth, async (req, res) => {
    //console.log("in /message"+req.body.email+req.body.text)
    const { text, email } = req.body
    if (!text || !email) return res.status(400).json({ error: "all fields required" })
    newMessage = { name: req.user.name, message: text }
    //console.log(newMessage)
    try {
        const result = await User.findOneAndUpdate({ email: email }, { $push: { message: newMessage } })
        //console.log(result)
        return res.status(201).json()
    } catch (err) { console.log(err) }
})
router.get("/mycontacts", auth, async (req, res) => {
    try {
        const mycontacts = await Contact.find({ postedBy: req.user._id }).populate("postedBy", "-password")
        return res.status(200).json({ contacts: mycontacts.reverse() })
    } catch (err) { console.log(err) }
})
router.get("/contact/:id", auth, async (req, res) => {
    const { id } = req.params
    try {
        const mycontact1 = await Contact.findOne({ _id: id })
        const mycontact = await Contact.findOne({ _id: id }).select("-postedBy")
        return res.status(200).json({ contact: mycontact })
    } catch (err) { console.log(err) }
})
router.delete("/delete/:id", auth, async (req, res) => {
    //console.log("in delete")
    //console.log(req.params)
    const { id } = req.params
    if (!id) return res.status(400).json({ error: "no id specified" })
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "please enter a valid id" })
    try {
        const contact = await Contact.findOne({ _id: id })
        if (!contact) return res.status(400).json({ error: "no contact found" })
        if (req.user._id.toString() !== contact.postedBy._id.toString()) return res.status(401).json({ error: "you cant delete" })
        const result = await Contact.deleteOne({ _id: id })
        const myContacts = await Contact.find({ postedBy: req.user._id }).populate("postedBy", "-password")
        return res.status(200).json({ ...contact._doc, myContacts: myContacts.reverse() })
    } catch (err) { console.log(err) }
})
router.put("/contact", auth, async (req, res) => {
    const { id } = req.body
    //console.log("in update" + req.body.id)
    if (!id) return res.status(401).json({ error: "no id specified" })
    if (!mongoose.isValidObjectId(id)) return res.status(401).json({ error: "please enter a valid id" })
    try {
        const contact = await Contact.findOne({ _id: id })
        if (!contact) return res.status(401).json({ error: "no contact found" })
        if (req.user._id.toString() !== contact.postedBy._id.toString()) return res.status(401).json({ error: "you cant update" })
        const newcontact = { ...req.body, id: undefined }
        const result = await Contact.findByIdAndUpdate({ _id: id }, { ...newcontact }, { new: true })
        //console.log({ ...result._doc })
        return res.status(200).json({ ...result._doc })
    } catch (err) { console.log(err) }
})
module.exports = router