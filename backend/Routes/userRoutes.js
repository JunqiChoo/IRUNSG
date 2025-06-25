const express = require("express");
const router = express.Router();
require('dotenv').config();

const {createUser} = require("../Controllers/userController")
const {CompareUser} = require("../Controllers/auth")
const {getProfile} = require("../Controllers/userController")
const auth = require("../middleware/authMiddleware");
const {getAllEvents} = require("../Controllers/eventController")
const {getChartData} = require("../Controllers/eventController");
const { createEvent } = require("../Controllers/eventController");
//getting all the task

//for creating user
router.route("/register").post(createUser);

//for login
router.route("/login").post(CompareUser)
router.route("/getProfile").get(auth,getProfile)

//for Events
router.route("/getAllEvents").get(getAllEvents);
router.route("/getChartData").get(getChartData);
router.route("/createEvent").post(createEvent);




//router.route("/:id").put(updateUser);
//router.route("/:id").delete(deleteUser)
//router.route("/:id").post(createUser)


module.exports = router;
