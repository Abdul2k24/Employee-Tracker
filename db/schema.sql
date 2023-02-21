DROP DATABASE If Exists employee_db;
CREATE DATABASE employee_db;


use employee_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAN(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAN(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,

    FOREIGN KEY(department_id) REFERENCES department(id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
      first_name VARCHAN(30) NOT NULL,
      last_name VARCHAN(30) NOT NULL,
      roles_id INT,
      manager_id INT
      FOREIGN KEY (role_id) REFERENCES roles(id)
      ON DELETE SET NULL,
      FOREIGN KEY (manager_id) REFERENCES employees(id)
      ON DELETE SET NULL
);
