const mysql = require('../util/mysql.js');
const HttpError = require("../util/http-error");
const {validationResult} = require('express-validator')



const login = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        if (errors.errors[0].param === 'username') {
            const err = new HttpError('Invalid username, must be 6-12 characters', 422)
            return next(err)
          } else if (errors.errors[0].param === 'password') {
            const err = new HttpError('Invalid password, must be be 6-12 characters', 422)
            return next(err)
          }
    }

    const username = req.body.username;
    const password = req.body.password;

    // FIND USERNAME + PASSWORD COMBO IN DATABASE

    console.log(`USER: ${username}, PASS: ${password}`)

    res.status(200).json({username, password});


}


exports.login = login;