const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err)=>{
    if(err){
        console.log("Database connection failed ❌");
    }
    else{
        console.log("Database connection successfully ✅");
    }
})

module.exports = connection