const mysql = require('../util/mysql.js');
const HttpError = require("../util/http-error");
const {validationResult} = require('express-validator');
const { Pricing } = require('../util/pricing.js');



const getPrice = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        if (errors.errors[0].param === 'username') {
            const err = new HttpError('Username given is not valid, must be 6-12 characters', 422)
            return next(err)
          } else if (errors.errors[0].param === 'state') {
            const err = new HttpError('State given is not valid, must be 2 characters', 422)
            return next(err)
          }
    }

    const state = req.body.state;
    const previousHistory = req.body.previousHistory;
    const gallonsRequested = req.body.gallonsRequested;





    const thePrice = new Pricing(state, previousHistory); 
    const [suggested, total] = thePrice.predictPrice(gallonsRequested);

    res.status(200).json({suggested, total});
}


exports.getPrice = getPrice;