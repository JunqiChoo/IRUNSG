
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

    }catch(err){
        console.log(err)
    }
}


module.exports = {createUser}