const express = require("express");
const router = express.Router();
const fuelController = require("../controllers/fuel.js");
const { check, body } = require("express-validator");


router.get("/gethistory/:uid", fuelController.getHistory)

router.post("/getprice",
    [
        body("state").isLength({min: 2, max: 2}),
        body("previousHistory").isBoolean(),
        body("gallonsRequested").isNumeric()

    ],
    fuelController.getPrice);

router.post("/submitquote",
    [
        body("adderss").isLength({min: 5, max: 100}),
        body("username").isLength({min: 6, max: 12}),
        body("date").isDate(),
        body("gallonsRequested").isNumeric(),
        body("suggested").isNumeric(),
        body("total").isNumeric()


    ],
    fuelController.submitQuote);




module.exports = router;