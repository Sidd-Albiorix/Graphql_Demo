//Postgre db configs

require('dotenv').config();

let dbConnObj = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
}

module.exports = dbConnObj;