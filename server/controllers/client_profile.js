const mysql = require('../util/mysql.js');
const HttpError = require("../util/http-error");
const {validationResult} = require('express-validator');

const user = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        if (errors.errors[0].param === 'name') {
            const err = new HttpError('Invalid name, must be 2-50 characters', 422)
            return next(err)
          } else if (errors.errors[0].param === 'address1') {
            const err = new HttpError('Invalid address 1, must be  5-50 characters', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'address2') {
            const err = new HttpError('Invalid address 2, must be  5-50 characters', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'city') {
            const err = new HttpError('Invalid city, must be  1-100 characters', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'state') {
            const err = new HttpError('Invalid state, must be 2 characters', 422)
            return next(err)
          }
          else if (errors.errors[0].param === 'zip') {
            const err = new HttpError('Invalid zipcode, must be 5-9 characters', 422)
            return next(err)
          }

    }
    const uid = req.body.uid;
    const name = req.body.name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    let result;

    const sqlStatement = {
      sql: "insert into TEST_USER_INFO (uid, name, address1, address2, city, state, zip) values (?, ?, ?, ?, ?, ?, ?)",
      values: [uid, name, address1, address2, city, state, zip]
    }

    try {
      result = await mysql.query(sqlStatement);
      if(result.affectedRows === 1) {
        res.status(200).json({msg: "successful user info insert"});
      } else {
        const err = new HttpError("DB ERROR", 422);
        return next(err);
      }
      
    } catch(err) {
      console.log(err)
      return next(err);
    }

}
exports.user = user