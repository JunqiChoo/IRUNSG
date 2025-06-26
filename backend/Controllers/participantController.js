const mongoose = require('mongoose');
const Participant = require("../Models/Participant"); // Adjust the path as needed
const connectDB = require('../Database/MongoDB');


const joinEvent = async(req,res)=>{
    await connectDB();
    const eventID = req.params.eid
    const UserID =  req.params.id

    try{
        const newParticipant = new Participant({
            eventID:eventID
            ,UserID:UserID
        })

        const result = await newParticipant.save();
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

const getAllParticipants = async(req,res)=>{
     await connectDB();
    const eventID = req.params.eid
    try{
        const result = await Participant.find({eventID:eventID}).populate('UserID')
        console.log(result)
        res.json(result)
    }catch(err){
        res.send(err)
    }

}

module.exports = {joinEvent,getAllParticipants}