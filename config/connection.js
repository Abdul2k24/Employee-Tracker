const mysql = require("mysql2");
const utils = require(utils);
const connection = mysql.createConnection(
{
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
},
console.log("connected to the employee_db database")
);