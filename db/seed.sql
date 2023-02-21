USE employee_db;
INSERT INTO department (name)
VALUES ("Police"),
("Scientist"),
("CEO");

INSERT INTO roles (title, salary, department_id)
VALUES ("Police", 50000, 1),
("Scientist",150000, 2),
("CEO", 300000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "James", 1, NULL),
("Kobe", "Bryant", 2, NULL)
("Micheal", "Jordan", 3, 1 NULL)
("Lebron", "James", 3, NULL)
("Dwight", "Howard", 2, NULL)
("Trey", "Burke", 1, 2 NULL)
("Kyrie", "Irving", 2, 3 NULL)
("Kevin", "Duranr", 1, 4 NULL)