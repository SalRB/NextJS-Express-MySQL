const mysql = require('mysql')
require('dotenv').config();

const connection = mysql.createConnection({
    multipleStatements: true,
    host: 'mysql',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

connection.connect()

// connection.end()

module.exports = connection;