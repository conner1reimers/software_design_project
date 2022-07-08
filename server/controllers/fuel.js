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

    if(!errors.isEmpty()) {
        if (errors.errors[0].param === 'address') {
            const err = new HttpError('Client server error, make sure your profile is set up', 422)
            return next(err)
          } else if (errors.errors[0].param === 'username') {
            const err = new HttpError('Username given is not valid, must be 6-12 characters', 422)
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
    const username = req.body.username;
    const date = req.body.date;
    const gallonsRequested = req.body.gallonsRequested;
    const suggested = req.body.suggested;
    const total = req.body.total;



    const sqlStatement = {
        sql: "insert into FUEL_QUOTE (address, date, uid, gallons, suggested, total) values (?, ?, ?, ?, ?, ?)",
        values: [address, date, username, gallonsRequested, suggested, total]
    }
    
    let result;
    // try {
    //     result = await mysql.query(sqlStatement);
    //     
    // } catch(err) {console.log(err)}



    res.status(200).json({...sqlStatement.values});
}


const getHistory = async (req, res, next) => {
    const uid = req.param.uid;

    const sqlStatement = {
        sql: "select * from FUEL_QUOTE where uid = ?",
        values: [uid]
    };

    let result;
    // try {
    //     result = await mysql.query(sqlStatement);
    //     
    // } catch(err) {console.log(err)}

    let today = new Date();

    //dummy data
    result = [
        {
            address: "5683 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 1002,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "5683 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 1002,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "5683 Dog st. Houston, TX. 77379",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 1002,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "3234 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 3102,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "5683 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 14102,
            suggested: 1.375,
            total: 11688
        },
        {
            address: "5683 Dog st. Houston, TX. 77379",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 1002,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "3234 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 3102,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "5683 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 14102,
            suggested: 1.375,
            total: 11688
        },
        {
            address: "5683 Dog st. Houston, TX. 77379",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 1002,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "5683 Dog st. Houston, TX. 77379",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 1002,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "3234 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 3102,
            suggested: 1.675,
            total: 1688
        },
        {
            address: "5683 Willow Tail st",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 14102,
            suggested: 1.375,
            total: 11688
        },
        {
            address: "5683 Dog st. Houston, TX. 77379",
            date: today.toDateString(),
            username: uid,
            gallonsRequested: 1002,
            suggested: 1.675,
            total: 1688
        },
    ];


    res.status(200).json(result);

}


exports.submitQuote = submitQuote;
exports.getPrice = getPrice;
exports.getHistory = getHistory;
