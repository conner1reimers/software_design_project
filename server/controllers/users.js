// const mysql = require('../util/mysql.js');
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



    // const sqlStatement = {
    //   sql: "select * from USERS where username = ? and password = ?",
    //   values: [username, password]
    // }

    // let userInfo;
    // let result;
    // try {
    //     result = await mysql.query(sqlStatement);

    //     if(result.rows.length >= 1) {
    //         userInfo = result.rows[0];
    //     }

    // } catch(err) {console.log(err)}



    // let hasPreviousPurchase = false;

    // Check database for previous quote history
    // const sqlStatement2 = {
    //   sql: "select * from FUEL_QUOTE where user_id = ?",
    //   values: [username]
    // }
  

    res.status(200).json({username, password});

}


const register = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
      if (errors.errors[0].param === 'username') {
          const err = new HttpError('Invalid username, must be 6-12 characters', 422)
          return next(err)
      } else if (errors.errors[0].param === 'password') {
        const err = new HttpError('Invalid password, must be be 6-12 characters', 422)
        return next(err)
      } else if (errors.errors[0].param === 'password2') {
        const err = new HttpError('Invalid password 2, must be be 6-12 characters', 422)
        return next(err)
      } 
        
  }

  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;


  if (password !== password2) {
    console.log(password2)
    const err = new HttpError('Passwords must match.', 422)
    return next(err)
  }

  // INSERT USER INTO DB
  // console.log(`USER: ${username}, PASS: ${password}`)

  // const sqlStatement = {
  //   sql: "insert into USERS (username, password) values (?, ?)",
  //   values: [username, password]
  // }
  
  // let userInfo;
  // let result;
  // try {
  //     result = await mysql.query(sqlStatement);
  //     
  // } catch(err) {console.log(err)}


  res.status(200).json({username, password});

}


exports.register = register;
exports.login = login;