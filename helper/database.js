const { allowedNodeEnvironmentFlags } = require("process");
const connection = require("../config/connection");
const db = require("../config/connection");

class Database {
    constructor(connection) {
        this.connection = connection;
}

    viewAllDepartments() {
        return this.connection.query("SELECT * FROM department");
    }
    ViewAllRoles(){
        return this.connection.query(
            "SELECT * FROM roles JOIN department ON department.id = roles.depart_id"
        );
    }

    ViewAllEmployees() {
        return this.connection.query(
            "SELECT * FROM eomployees JOIN roles ON roles.id = employees.role_id JOIN department_id = this.viewAllDepartments.id JOIN eomployees e ON e.id = employees.manager"
        );
    }

     addDepartment (departmentName) {
        return this.connection.query(
            "INSERT INTO departments SET name = ?",
            departmentName
         );
    }

    addRoles(title, salary, department_id) {
        return this.connection.query(
            "INSERT INTO roles SET title = ?, salary = ?, department_id = ?",
            [ title, salary, department_id]
        );
    }
    
     addEmployees(firstName, LastName, role_id, manager_id) {
        return this.connection.query(
            "INSERT INTO employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?",
            [firstName, LastName, role_id, manager_id])
        }
    }

    const database = new Database(db);

    module.exports = database;