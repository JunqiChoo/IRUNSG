const express = require("express");
const router = express.Router();
require('dotenv').config();

const {createUser,updatePoints} = require("../Controllers/userController")
const {CompareUser} = require("../Controllers/auth")
const {getProfile} = require("../Controllers/userController")
const {getUser,getLongLat} = require("../Controllers/userController")
const auth = require("../middleware/authMiddleware");
const {getAllEventsOngoing,getAllEventsCompleted,deleteEvent} = require("../Controllers/eventController")

const {completeEvent} = require("../Controllers/eventController")
const {getChartData} = require("../Controllers/eventController");
const { createEvent } = require("../Controllers/eventController");
const {getEvent,editEvent} = require("../Controllers/eventController")
const {joinEvent} = require("../Controllers/participantController")
const {getAllParticipants,getAllCompletedParticipant} = require("../Controllers/participantController")
const {checkParticipatedUser,withdrawEvent,updateEventCompletionStatus,getParticipatedData} = require("../Controllers/participantController")


//getting all the task

//for creating user
router.route("/register").post(createUser);

//for login
router.route("/login").post(CompareUser)
router.route("/getProfile").get(auth,getProfile)
router.route("/getUser/:id").get(getUser)
router.route("/updatePoints/:id/:points").put(updatePoints)
router.route("/getLongLat/:postal").get(getLongLat)

//for Events
router.route("/getAllEventsOngoing").get(getAllEventsOngoing);
router.route("/getAllEventsCompleted/:id").get(getAllEventsCompleted);
router.route("/getChartData").get(getChartData);
router.route("/createEvent").post(createEvent);
router.route("/getEvent/:id").get(getEvent);
router.route("/completeEvent/:eid").put(completeEvent);
router.route("/deleteEvent/:eid").delete(deleteEvent);
router.route("/editEvent/:eid").put(editEvent);

//for participants route
router.route("/joinEvent/:id/:eid").post(joinEvent)
router.route("/withdrawEvent/:id/:eid").delete(withdrawEvent)
router.route("/getAllParticipants/:eid").get(getAllParticipants)
router.route("/checkParticipatedUser/:id/:eid").get(checkParticipatedUser)
router.route("/updateEventCompletionStatus/:id").put(updateEventCompletionStatus)
router.route("/getParticipatedData/:id").get(getParticipatedData)
router.route("/getAllCompletedParticipant/:id").get(getAllCompletedParticipant)



//router.route("/:id").put(updateUser);
//router.route("/:id").delete(deleteUser)
//router.route("/:id").post(createUser)


module.exports = router;
