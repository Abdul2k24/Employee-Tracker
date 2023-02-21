const mysql = require("mysql2");
const util = require("util");
const connection = mysql.createConnection(
{
    host: "localhost",
    user: "root",
    password: "bootstrap",
    database: "employee_db",
},
console.log("connected to the employee_db database")
);

connection.query = util.promisify(connection. query);

module.exports = connection;