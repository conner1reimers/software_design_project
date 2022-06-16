const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/users.js");


// :username indicates in the URL we will specify that parameter
router.get("/test/:username", employeeController.test);



module.exports = router;