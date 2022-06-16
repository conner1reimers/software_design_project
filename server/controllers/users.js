const mysql = require('../util/mysql.js');



const test = async (req, res, next) => {
    const sqlStatement = {
        sql: "select * from users where username = ?",
        values: ["testuser"]
    }

    let result;
    try {
        result = await mysql.query(sqlStatement);
        console.log(result);
        res.status(200).json({ result });
    } catch(err) {
        return next(err)
    }
}


exports.test = test;