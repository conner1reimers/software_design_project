const mysql = require('../util/mysql.js');
const HttpError = require("../util/http-error");
const {validationResult} = require('express-validator');
const Pricing  = require('../util/pricing.js');



const getPrice = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log(errors)
        if (errors.errors[0].param === 'previousHistory') {
            const err = new HttpError('Client server error, make sure your profile is set up', 422)
            return next(err)
        } else if (errors.errors[0].param === 'state') {
          const err = new HttpError('State given is not valid, must be 2 characters', 422)
          return next(err)
        }
        else if (errors.errors[0].param === 'gallonsRequested') {
            const err = new HttpError('Requested gallons must be a number', 422)
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

const submitQuote = async (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.body)

    if(!errors.isEmpty()) {
        if (errors.errors[0].param === 'address') {
            const err = new HttpError('Client server error, make sure your profile is set up', 422)
            return next(err)
          } else if (errors.errors[0].param === 'uid') {
            const err = new HttpError('UID Invalid. Server error', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'date') {
            const err = new HttpError('Date given is not valid, must be a date', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'gallonsRequested') {
            const err = new HttpError('Requested gallons must be a number', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'suggested') {
            const err = new HttpError('Server error', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'total') {
            const err = new HttpError('Server error', 422)
            return next(err)
          }
    }

    const address = req.body.address;
    const uid = req.body.uid;
    const date = req.body.date;
    const gallonsRequested = req.body.gallonsRequested;
    const suggested = req.body.suggested
    const total = req.body.total;



    const sqlStatement = {
        sql: "insert into FUEL_QUOTES (delivery_address, delivery_date, uid, gallons, suggested, total) values (?, ?, ?, ?, ?, ?)",
        values: [address, date, uid, gallonsRequested, suggested, total]
    }
    
    let result;
    try {
        result = await mysql.query(sqlStatement);
        if(result.affectedRows === 1) res.status(200).json({msg: "Successful insert to database"});
        else {
            const err = new HttpError('DB ERROR', 422)
            return next(err)
        }
    } catch(err) {
        console.log(err)
        return next(err);
    }
}


const getHistory = async (req, res, next) => {
    const uid = req.params.uid;

    const sqlStatement = {
        sql: "select * from FUEL_QUOTES where uid = ?",
        values: [uid]
    };

    let result;
    try {
        result = await mysql.query(sqlStatement);
        console.log(result)
        res.status(200).json(result);
        
    } catch(err) {
        console.log(err);
        return next(err);
    }



}


exports.submitQuote = submitQuote;
exports.getPrice = getPrice;
exports.getHistory = getHistory;
