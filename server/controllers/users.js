// const mysql = require('../util/mysql.js');
const HttpError = require("../util/http-error");
const {validationResult} = require('express-validator')
const { v4: uuidv4 } = require('uuid');



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
<<<<<<< HEAD

    // FIND USERNAME + PASSWORD COMBO IN DATABASE



    // const sqlStatement = {
    //   sql: "select * from USERS where username = ? and password = ?",
    //   values: [username, password]
    // }
=======
    
    const sqlStatement = {
      sql: "select * from USERS where username = ? and password = ?",
      values: [username, password]
    }
>>>>>>> conner_reimers

    let uid;
    let result;
    let hasPreviousPurchase = false;
    try {
        result = await mysql.query(sqlStatement);

        if(result.length >= 1) uid = result[0].uid;
        

        // Now check database for previous quote history
        const sqlStatement2 = {
          sql: "select * from FUEL_QUOTE where user_id = ?",
          values: [uid]
        }

        result = await mysql.query(sqlStatement2);

<<<<<<< HEAD
    // let hasPreviousPurchase = false;

    // Check database for previous quote history
    // const sqlStatement2 = {
    //   sql: "select * from FUEL_QUOTE where user_id = ?",
    //   values: [username]
    // }
=======
        if(result.length >= 1) hasPreviousPurchase = true;
        
        res.status(200).json({hasPreviousPurchase, uid});

    } catch(err) {
      console.log(err);
      return next(err);
    }
>>>>>>> conner_reimers
  

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

  const sqlStatement = {
    sql: "insert into TEST_USERS (username, password) values (?, ?)",
    values: [username, password]
  }
  


  const sessID = uuidv4();
  const sqlStatement2 = {
    sql: "insert into COOKIES (sid, uid) values (?, LAST_INSERT_ID())",
    values: [sessID]
  }
  
  let uid;
  let result;

  try {
    mysql.beginTransaction(async function(err) {
      if(err) return next({ msg: "Database connection failure" });

      try {
        result = await mysql.query(sqlStatement);
        let result2;
        if(result.affectedRows === 1) {
          result2 = await mysql.query(sqlStatement2);
          uid = result.insertId;
          if(result2.affectedRows === 1) {
            res.cookie('sid', sessID, {expires: new Date(Date.now() + 1296000000), httpOnly: false });
            res.status(200).json({msg: "Successfully Created an Account", id: uid});
            mysql.commit();
          } else {
            mysql.rollback();
            const err = new HttpError("DB ERROR", 422);
            return next(err);
          }
        }

      } catch(err) {
        console.log(err)
        mysql.rollback();
        return next(err);
      }
      
    })
  } catch(err) {
    console.log(err)
    return next(err);
  }
  

}


const checkCookie = async (req, res, next) => {
  const cookies = req.cookies;

  let result;
  let result2;
  let uid;
  let hasPreviousPurchase = false;

  if(cookies.sid) {
    const sqlStatement = {
      sql: "select uid from COOKIES where sid = ?",
      values: [cookies.sid]
    }

    try {
      result = await mysql.query(sqlStatement);
      uid = result[0].uid;

      const sqlStatement2 = {
        sql: "select * from TEST_USER_INFO where uid = ?",
        values: [uid]
      }

      result2 = await mysql.query(sqlStatement2);
      console.log(result2);
      
      const sqlStatement3 = {
        sql: "select * from FUEL_QUOTES where uid = ?",
        values: [uid]
      }

      result = await mysql.query(sqlStatement3);


      if(result.length >= 1) hasPreviousPurchase = true;
      
      res.status(200).json({
        hasPreviousPurchase,
        uid,
        userInfo: result2[0],
        msg: "cookie found"
      });

      
    } catch(err) {
      console.log(err)
      return next(err);
    }
  

  } else {
    res.status(200).json({msg: "no cookie"})
  }
  
}


exports.register = register;
exports.login = login;
exports.checkCookie = checkCookie;
