require('dotenv').config();


module.exports = {
    HOST: process.env.REACT_APP_DBHOST,
    USER: process.env.REACT_APP_DBUSER,
    PASSWORD: process.env.REACT_APP_DBPASSWORD,
    DB: process.env.REACT_APP_DBNAME
}