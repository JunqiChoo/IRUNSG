const mongoose = require('mongoose');
const Participant = require("../Models/Participant"); // Adjust the path as needed
const connectDB = require('../Database/MongoDB');

const withdrawEvent = async(req,res)=>{
    const eventID = req.params.eid
    const UserID =  req.params.id
    await connectDB();
    try{
        const result =await Participant.deleteOne({  eventID:eventID,UserID:UserID})
        res.json(result)
    }catch(err){
        res.json(err)
    }
}
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
        
        res.json(result)
    }catch(err){
        res.json(err)

    }
}

const getAllParticipants = async(req,res)=>{
     await connectDB();
    const eventID = req.params.eid
    try{
        const result = await Participant.find({eventID:eventID}).populate('UserID').populate('eventID')
        console.log(result)
        res.json(result)
    }catch(err){
        res.send(err)
    }

}

const getAllCompletedParticipant = async(req,res)=>{
    const id = req.params.id
      await connectDB();
      try{
          const result = await Participant.find({UserID:id}).populate('UserID').populate('eventID')
          res.json(result)
      }catch(err){
            res.json(err)
      }
}









const updateEventCompletionStatus = async(req,res)=>{
    const id = req.params.id
    connectDB();
    try{
        const result = await Participant.findOneAndUpdate({UserID:id},{EventCompletion:true});
        res.json(result);
    }catch(err){
        res.json(err);
    }
}
const getParticipatedData = async (req, res) => {
    const id = req.params.id;
    connectDB();

    try {
        const result = await Participant.find({ UserID: id }).populate('eventID');
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const checkParticipatedUser = async(req,res)=>{
     const eventID = req.params.eid
        const UserID =  req.params.id
     await connectDB();
     try{
        const result = await Participant.find({UserID:UserID,eventID:eventID})
        res.json(result)
     }catch(err){
        res.json(err);
     }
}

module.exports = {joinEvent,getAllParticipants,checkParticipatedUser,withdrawEvent,updateEventCompletionStatus,getParticipatedData,getAllCompletedParticipant}