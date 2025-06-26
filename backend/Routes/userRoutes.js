const express = require("express");
const router = express.Router();
require('dotenv').config();

const {createUser} = require("../Controllers/userController")
const {CompareUser} = require("../Controllers/auth")
const {getProfile} = require("../Controllers/userController")
const {getUser} = require("../Controllers/userController")
const auth = require("../middleware/authMiddleware");
const {getAllEvents} = require("../Controllers/eventController")
const {getChartData} = require("../Controllers/eventController");
const { createEvent } = require("../Controllers/eventController");
const {getEvent} = require("../Controllers/eventController")
const {joinEvent} = require("../Controllers/participantController")
const {getAllParticipants} = require("../Controllers/participantController")

//getting all the task

//for creating user
router.route("/register").post(createUser);

//for login
router.route("/login").post(CompareUser)
router.route("/getProfile").get(auth,getProfile)
router.route("/getUser/:id").get(getUser)

//for Events
router.route("/getAllEvents").get(getAllEvents);
router.route("/getChartData").get(getChartData);
router.route("/createEvent").post(createEvent);
router.route("/getEvent/:id").get(getEvent);

//for participants route
router.route("/joinEvent/:id/:eid").post(joinEvent)
router.route("/getAllParticipants/:eid").get(getAllParticipants)




//router.route("/:id").put(updateUser);
//router.route("/:id").delete(deleteUser)
//router.route("/:id").post(createUser)


module.exports = router;
