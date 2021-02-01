const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'shong91',
    database: 'myapp',

});

exports.pool = pool; 
