const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");


// :username indicates in the URL we will specify that parameter
router.get("/test/:username", usersController.test);



module.exports = router;