const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const { check, body } = require("express-validator");


// :username indicates in the URL we will specify that parameter
router.post("/login",
    [
        body("username").isLength({min: 6, max: 12}),
        body("password").isLength({min: 6, max: 12})
    ],
    usersController.login);



module.exports = router;