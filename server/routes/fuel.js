const express = require("express");
const router = express.Router();
const fuelController = require("../controllers/fuel.js");
const { body } = require("express-validator");


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
        body("address").isLength({min: 5, max: 200}),
        body("uid").isNumeric(),
        body("date").isDate(),
        body("gallonsRequested").isNumeric(),
        body("suggested").isNumeric(),
        body("total").isNumeric()

    ],
    fuelController.submitQuote);


module.exports = router;