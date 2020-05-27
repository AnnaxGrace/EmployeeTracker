var roles = []
var managers = []

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
            allEmployees();
            // runSearch();
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
    var query = "SELECT employee.first_name, employee.last_name, employee.id, department_role.title, department_role.salary, department.name ";
    query += "FROM employee INNER JOIN department_role ON (employee.role_id = department_role.id)";
    query += "INNER JOIN department ON (department_role.department_id = department.id)";
    query += "ORDER BY employee.id";
    connection.query(query, function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
        console.log(`| ${results[i].id} | ${results[i].first_name} ${results[i].last_name} | ${results[i].name} | ${results[i].title} | ${results[i].salary} | `)
    }
    
    runSearch();
})
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

//have to predefine roles and salary
//1, 2, 3, 4 department ids
//"Finance", "Sales", "Legal", "Engineering"

//leads are managers