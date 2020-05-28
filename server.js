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
    var query = "SELECT employees.first_name, employees.last_name, employees.id, department_role.title, department_role.salary, department.name ";
    query += "FROM employees INNER JOIN department_role ON (employees.role_id = department_role.id)";
    query += "INNER JOIN department ON (department_role.department_id = department.id)";
    query += "ORDER BY employees.id";
    connection.query(query, function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
        console.log(`| ${results[i].id} | ${results[i].first_name} ${results[i].last_name} | ${results[i].name} | ${results[i].title} | ${results[i].salary} | `)
    }
    
    runSearch();
})
}

function employeesDepartment() {
    inquirer.prompt ({
        name: "department",
        type: "rawlist",
        message: "What department do you want to search by?",
        choices: [
            "Finance",
             "Sales", 
             "Legal", 
             "Engineering"
        ]
        
    }).then(function(answer) {
        var query = "SELECT department.name, employees.first_name, employees.last_name, employees.id ";
        query += "FROM employees INNER JOIN department_role ON (employees.role_id = department_role.id)";
        query += "INNER JOIN department ON (department_role.department_id = department.id)";
        query += "WHERE ( department.name = ?)";
        query += "ORDER BY employees.id";
        connection.query(query, [answer.department], function(err, res){
            if (err) throw err;
            for (i = 0; i < res.length; i ++) {
                console.log(`| ${res[i].id} |  ${res[i].first_name} ${res[i].last_name} |`);
            }

            runSearch();
        })


    });
  
}

function employeesManager() {
    console.log("Employees Manager");
    runSearch();
}

function getRoles() {
   query = "SELECT department_role.title "
    query += "FROM department_role"
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i ++) {
            roles.push(res[i].title);
        }
    }) 
}

function addEmployee() {
    getRoles();
    inquirer.prompt ([
    {
        name: "first",
        type: "input",
        message: "What is the first name of your employee?"
    },
    {
        name: "last",
        type: "input",
        message: "What is the last name of your employee?"
    },
    {
        name: "role",
        type: "rawlist",
        choices: roles
    },


]).then(function (responses) {
    var roleNumber;
    connection.query("SELECT department_role.id, department_role.title FROM department_role", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++ ) {
            if (res[i].title === responses.role) {
                console.log("This is the id " + res[i].id);
                roleNumber = res[i].id;
                console.log(roleNumber)
            }
        }

        connection.query(
            "INSERT INTO employees SET ?",
        {
            first_name: responses.first,
            last_name: responses.last,
            role_id: roleNumber,
            manager_id: responses.manager || 0
        }, 
        function(err) {
            if (err) throw err;
            console.log("Added employee successfully");
            
            runSearch();
        });

    })
    

    
});
    
  
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