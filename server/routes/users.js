const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const userProfileController = require("../controllers/client_profile.js");
const { body } = require("express-validator");


router.post("/login",
    [
        body("username").isLength({min: 6, max: 12}),
        body("password").isLength({min: 6, max: 12})
    ],
    usersController.login);

router.post("/register",
    [
        body("username").isLength({min: 6, max: 12}),
        body("password").isLength({min: 6, max: 12}),
        body("password2").isLength({min: 6, max: 12})

    ],
    usersController.register);




router.post("/User_profile",
    [
        body("name").isLength({min: 2, max: 50}),
        body("address1").isLength({min: 5, max: 100}),
        body("address2").isLength({min: 5, max: 100}),
        body("city").isLength({min: 1, max: 100}),
        body("state").isLength({min: 2, max: 2}),
        body("zip").isLength({min: 5, max: 9}),
    ],
    userProfileController.user);


router.get("/checkcookie", usersController.checkCookie)
router.get("/logout", usersController.logout)

module.exports = router;