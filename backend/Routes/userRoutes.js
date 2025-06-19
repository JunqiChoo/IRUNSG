const express = require("express");
const router = express.Router();


const {createUser} = require("../Controllers/userController")

//getting all the task


router.route("/").post(createUser);
//router.route("/:id").put(updateUser);
//router.route("/:id").delete(deleteUser)
//router.route("/:id").post(createUser)


module.exports = router;
