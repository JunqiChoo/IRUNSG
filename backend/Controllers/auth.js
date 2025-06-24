require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const connectDB = require('../Database/MongoDB');




const CompareUser = async(req,res)=>{
     const { email, password } = req.body;
     console.log("REQ BODY:", req.body); 
     console.log(process.env.JWT_SECRET);
     connectDB();

    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = {
            user: {
                id: user._id,
                email: user.email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        console.log("meow")
        res.status(500).send('Server error');
    }
}


module.exports = {CompareUser}