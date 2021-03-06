const mysql = require('../util/mysql.js');
const HttpError = require("../util/http-error");
const {validationResult} = require('express-validator')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');




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
    //encrypt password for comparison
    
    
    const sqlStatement = {
      sql: "select * from USERS where username = ?",
      values: [username]
    }

    let uid;
    let result;
    let clientProfileResult;
    let hasPreviousPurchase = false;
    let userInfo;
    try {
        result = await mysql.query(sqlStatement);


        if(result.length >= 1) {
          const match = await bcrypt.compare(password, result[0].password);

          if(match) {
            uid = result[0].uid;
          } else {
            const err = new HttpError('Invalid password', 422);
            return next(err);
          }
          
        } else {
          const err = new HttpError('Invalid username/password', 422);
          return next(err);
        }
        

        // Now check database for previous quote history
        const sqlStatement2 = {
          sql: "select * from FUEL_QUOTES where uid = ?",
          values: [uid]
        }

        result = await mysql.query(sqlStatement2);

        const sqlStatement3 = {
          sql: "select * from CLIENT_INFO where uid = ?",
          values: [uid]
        }


        clientProfileResult = await mysql.query(sqlStatement3);

        if(clientProfileResult.length >= 1) userInfo = clientProfileResult[0];

        const sessID = uuidv4();
        const sqlStatement4 = {
          sql: "insert into COOKIES (sid, uid) values (?, ?)",
          values: [sessID, uid]
        }
        let cookieResult = await mysql.query(sqlStatement4);
        if(cookieResult.affectedRows === 1) {
          res.cookie('sid', sessID, {expires: new Date(Date.now() + 1296000000), httpOnly: false });
          res.status(200).json({hasPreviousPurchase, uid, userInfo});
        } else {
          const err = new HttpError('server error', 422)
          return next(err)
        }
        

    } catch(err) {
      console.log(err);
      return next(err);
    }
  

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
  
  const salt = bcrypt.genSaltSync(15);
  let hash;

  const username = req.body.username;
  let password = req.body.password;
  const password2 = req.body.password2;


  if (password !== password2) {
    console.log(password2)
    const err = new HttpError('Passwords must match.', 422)
    return next(err)
  }

  //password is inserted encrypt password here
  try {
    hash = await bcrypt.hash(password,salt);
  } catch(err) {
    return next(err);
  }
  
  const sqlStatement = {
    sql: "insert into USERS (username, password) values (?, ?)",
    values: [username, hash]
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
      console.log(result)
      uid = result[0].uid;

      const sqlStatement2 = {
        sql: "select * from CLIENT_INFO where uid = ?",
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

const logout = async (req, res, next) => {
  const cookies = req.cookies;

  if(cookies.sid) {
    const sqlStatement = {
      sql: "delete from COOKIES where sid = ?",
      values: [cookies.sid]
    }

    try {
      await mysql.query(sqlStatement);
      res.clearCookie("sid");
      res.status(200).json({msg: "logged out"});
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
exports.logout = logout;
