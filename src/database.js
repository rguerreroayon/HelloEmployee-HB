const mysql = require('mysql');

// TRANSFORMING CALLBACKS TO PROMISES BABY OHHHYEAH
const {promisify} = require('util');


const {database} = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err,connection) =>{
    console.log('trying');
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CON, :c ');
        }
    }

    if(connection) connection.release();
    console.log('DB is connected');
    return;


});

//QUERY FROM CALLBACK TO PROMISE WITH P R O M I S I F Y
pool.query = promisify(pool.query);


module.exports = pool;