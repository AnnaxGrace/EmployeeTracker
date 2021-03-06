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


SELECT * FROM department;

SELECT * FROM department_role;

SELECT * FROM employees;
