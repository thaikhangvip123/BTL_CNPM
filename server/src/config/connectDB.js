import mysql from 'mysql2';


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jacuby@123',
    database: 'BTL_CNPM'
})

module.exports = connection;
