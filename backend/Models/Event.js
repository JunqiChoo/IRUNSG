const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
   eventName: {
    type: String,
    required: true
  },
  postal: {
    type: Number,
    required: true
  },
  runtype: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  UserID: {
    type: String,
    required: true
  },
  EventStatus: {
    type: Boolean,
    required: true,
    default:false
  },
  points: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Event = mongoose.model("Event",eventSchema);

module.exports = Event;