
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "cogsworth",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
})

function runSearch() {
    inquirer.prompt({
        name: "start",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ]

    })
    .then(function(answer) {
        switch(answer.start) {
        case "View All Employees":
            console.log("working?");
            allEmployees();
            break; 

        case "View All Employees By Department":
            employeesDepartment();
            break;

        case "View All Employees By Manager":
            employeesManager();
            break;

        case "Add Employee":
            addEmployee();
            break;
        
        case "Remove Employee":
            removeEmployee();
            break;

        case "Update Employee Role":
            updateRole();
            break;

        case "Update Employee Manager":
            updateManager();
            break;
        }
    });
}

function allEmployees() {
    console.log("All employees");
    runSearch();
}

function employeesDepartment() {
    console.log("Employees Department");
    runSearch();
}

function employeesManager() {
    console.log("Employees Manager");
    runSearch();
}

function addEmployee() {
    console.log("Add Employee");
    runSearch();
}

function removeEmployee() {
    console.log("Remove Employee");
    runSearch();
}

function updateRole() {
    console.log("Update Role");
    runSearch();
}

function updateManager() {
    console.log("Update Manager");
    runSearch();
}

