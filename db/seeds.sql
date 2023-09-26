INSERT INTO department (name)
VALUES ("Management"),
("Sales Rep"),
("Marketing"),
("Security");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 110000, 1),
("Budtender", 70000, 2),
("Social Media Manager", 65000, 3),
("Delivery Driver", 70000, 2),
("Security Guard", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Linda", "Vuong", 1, NULL),
("Allie", "Deaver", 3, 1),
("Malia", "Cho", 4, 1),
("Vanna", "Luciano", 2, 1),
("Chan", "Nguyen", 2, 1),
("Krystian", "Kowalak", 5, 1),
("Matthew", "Galvin", 5, 1);