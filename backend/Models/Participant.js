const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
    eventID:{
        type:String,
        required:true
    },UserID:{
        type:String,
        required:true,
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    }
});

const Participant = mongoose.model("Participant",participantSchema);


module.exports = Participant;