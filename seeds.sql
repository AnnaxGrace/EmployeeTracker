INSERT INTO department (name) values ("Finance"), ("Sales"), ("Legal"), ("Engineering");

INSERT INTO department_role (title, salary, department_id) 
VALUES ("Salesperson", 80000.00, 2), ("Sales Lead", 10000.00, 2), ("Accountant", 125000.00, 1);
INSERT INTO department_role (title, salary, department_id)
VALUES ("Finance Lead", 220000, 1), ("Lawyer", 30000, 3), ("Legal Lead", 400000, 3);
INSERT INTO department_role (title, salary, department_id)
VALUES ("Engineer", 120000, 4), ("Lead Engineer", 300000, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Anna", "Conover", 1), ("Love", "Dovey", 4), ("Hugh", "Jackson", 6), ("Calvin", "Kline", 8);