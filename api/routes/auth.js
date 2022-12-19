const router = require("express").Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (e) {
        res.status(500).json(e)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json('wrong credentials!')

        const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const pass = hashedPass.toString(CryptoJS.enc.Utf8)
        pass !== req.body.password && res.status(401).json('wrong credentials!')

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, { expiresIn: '3d' }
        )

        const { password, ...others } = user._doc
        res.status(200).json({ ...others, accessToken })
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router