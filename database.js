// database.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "socialmedia", // Ensure this database exists
    port: process.env.DB_PORT,
    connectionLimit: 10
});

pool.query('SELECT * FROM userinfo', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    // console.log('Query results:', results);
});
export default pool;