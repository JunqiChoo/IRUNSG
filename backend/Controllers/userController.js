
const mongoose = require('mongoose');
const User = require("../Models/User"); // Adjust the path as needed
const connectDB = require('../Database/MongoDB');
const bcrypt = require('bcrypt');

const axios = require("axios");

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


const getLongLat = async(req,res)=>{
    const postalcode = req.params.postal
    try{
        const response = await axios.get(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalcode}&returnGeom=Y&getAddrDetails=Y`)
        res.json(response.data)
    }catch(err){
        res.json(err)
    }
  
}

const updatePoints = async(req, res) => {
    await connectDB();
    try {
        const result = await User.findByIdAndUpdate(
             req.params.id , { $inc: { points: Number(req.params.points) } },
  { new: true, runValidators: true }
);
        await res.json(result)
    } catch (err) {
        res.json(err);
    }
}


const getUser = async(req,res)=>{
    await connectDB();
    try{
        const result = await User.findById(req.params.id)
        res.json(result)
    }catch(err){
            res.json(err)
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


module.exports = {createUser,getProfile,getUser,updatePoints,getLongLat}