
const mongoose = require('mongoose');
const User = require("../Models/User"); // Adjust the path as needed
const connectDB = require('../Database/MongoDB');
const bcrypt = require('bcrypt');

//getUser,updateUser,deleteUser,createUser

//logical messy part here 

const createUser = async(req,res)=>{
    const { email,
        password,
        postalCode,
        username} = req.body;
    try{
        await connectDB();
        const newUser = new User({
            email:email,
            password:password,
            postalCode:postalCode,
            username:username,
        })
        const saveUser = await newUser.save();
        console.log(saveUser)
    }catch(err){
        console.log(err)
    }
}



const getProfile = async (req, res) => {
    connectDB();
    console.log(req.user.id);
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}


module.exports = {createUser,getProfile}