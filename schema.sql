DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
    id INTEGER(4) AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE department_role (
    id INTEGER(4) AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(11, 2),
    department_id INTEGER(4) ,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR (30),
    role_id INTEGER(4),
    manager_id INTEGER(4),
    PRIMARY KEY (id)
);

INSERT INTO department (name) values ("Finance"), ("Sales"), ("Legal"), ("Engineering");

INSERT INTO department_role (title, salary, department_id) 
VALUES ("Salesperson", 80000.00, 2), ("Sales Lead", 10000.00, 2), ("Accountant", 125000.00, 1);
INSERT INTO department_role (title, salary, department_id)
VALUES ("Finance Lead", 220000, 1), ("Lawyer", 30000, 3), ("Legal Lead", 400000, 3);
INSERT INTO department_role (title, salary, department_id)
VALUES ("Engineer", 120000, 4), ("Lead Engineer", 300000, 4);

SELECT * FROM department;

SELECT * FROM department_role;

SELECT * FROM employees;
