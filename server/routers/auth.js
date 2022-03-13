const express = require('express');
const router = express.Router()
const argon2 = require('argon2')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
//@route POST api/auth/register
//@desc Register a user
//@access Public

//@route GET api/auth
//@desc Check if user is logged in
//@access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'User not found' });
         return res.json({ success: true, user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


router.post('/register', async (req, res) => {
    const { username, password } = req.body

    //simple validation
    if (!username || !password) return res.status(400).json({ success: false, message: 'Invalid username or password' })
    try {
        //Check for exiting user
        const user = await User.findOne({ username })
        if (user) return res.status(400).json({ success: false, message: 'User already exists' })
        //All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username, password: hashedPassword
        })
        await newUser.save()
        //return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.json({ success: true, message: 'User created successfully', accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
//@route POST api/auth/login
//@desc Login a user
//@access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //simple validation
    if (!username || !password) return res.status(400).json({ success: false, message: 'Invalid username or password' })
    try {
        //Check for existing user
        const user = await User.findOne({ username })
        if (!user)
            return res.status(404).json({ success: false, message: 'Incorrect username or password ' })
        //username found

        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) return res.status(400).json({ success: false, message: 'Invalid username or password' })
        //All good
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.json({ success: true, message: 'Login successfully', accessToken })

    } catch (error) {

    }
})
module.exports = router