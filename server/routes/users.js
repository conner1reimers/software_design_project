const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/users.js");


router.get("/test", employeeController.test);



module.exports = router;