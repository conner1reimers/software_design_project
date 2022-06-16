const mysql = require('../util/mysql.js');



const test = async (req, res, next) => {
    const sqlStatement = {
        sql: "select * from users where username = ?",
        values: ["testuser"]
    }

    let result;

    try {
        result = await mysql.query(sqlStatement);

        res.status(200).json({ user: result[0] });

    } catch(err) {return next(err)}
}


exports.test = test;