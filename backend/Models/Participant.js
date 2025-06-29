const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
    eventID:{
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },UserID:{
        required:true,
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },EventCompletion:{
        type:Boolean,
        required:true,
        default:false
    }
});

const Participant = mongoose.model("Participant",participantSchema);


module.exports = Participant;