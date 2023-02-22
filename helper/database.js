const connection = require("../config/connection");

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  viewAllRoles() {
    return this.connection.query(
      "SELECT * FROM roles JOIN department ON department.id = roles.department_id"
    );
  }

  viewAllEmployees() {
    return this.connection.query(
      "SELECT * FROM employees JOIN roles ON roles.id = employees.role_id JOIN department ON department.id = roles.department_id LEFT JOIN employees e ON e.id = employees.manager_id"
    );
  }

  addDepartment(departmentName) {
    return this.connection.query(
      "INSERT INTO department SET name = ?",
      departmentName
    );
  }

  addRole(title, salary, departmentId) {
    return this.connection.query(
      "INSERT INTO roles SET title = ?, salary = ?, department_id = ?",
      [title, salary, departmentId]
    );
  }

  addEmployees(firstName, lastName, roleId, managerId) {
    return this.connection.query(
      "INSERT INTO employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?",
      [firstName, lastName, roleId, managerId]
    );
  }
}

const database = new Database(connection);

module.exports = database;
