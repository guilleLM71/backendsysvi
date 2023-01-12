import mysql from 'mysql';
import { promisify } from 'util';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'sysvif'
});

pool.getConnection((err, connection) => {

    if( err ){
        if( err.code === 'PROTOCOL_CONNECTION_LOST' ) console.log('DATABASE CONNECTION WAS CLOSED');
        if( err.code === 'ER_CON_COUNT_ERROR' ) console.log('DATABASE HAS TO MANY CONNECTIONS');
        if( err.code === 'ECONNREFUSED' ) console.log('DATABASE CONNECTION WAS REFUSED');
    }

    if( connection ) connection.release();

    console.log('DB connectado');
    return;
});

pool.query = promisify( pool.query );


export default pool;