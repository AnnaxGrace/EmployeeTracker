//variables that contain empty arrays that will hold all of the names of our departments and roles
//Use for choices later in inquirer.
var roles = [];
var departments = [];

//Our dependency requires and our connection
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


//Our primary function that runs at the beginning, and goes through our choices
function runSearch() {

    //start questions that tell the client what they can do
    inquirer.prompt({
        name: "start",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "View All Employees By Department",
            "View All Employees By Roles",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
        ]

    }).then(function(answer) {
        //case switch that runs functions depending on the answer above
        switch(answer.start) {
        case "View All Employees":
            allEmployees();
            break; 

        case "View All Departments":
            allDepartments();
            break;
        
        case "View All Roles":
            allRoles();
            break;

        case "View All Employees By Department":
            employeesDepartment();
            break;

        case "View All Employees By Roles":
            employeesRoles();
            break;

        case "Add Employee":
            addEmployee();
            break;
        
        case "Add Role":
            addRole();
            break;

        case "Add Department":
            addDepartment();
            break;

        case "Update Employee Role":
            updateRole();
            break;
        }
    });
}

//Selects all information, and joins all three tables together
//Then displays all the employees by their ID number in the terminal with a console log
//Brings up start questions
function allEmployees() {
    var query = "SELECT employees.first_name, employees.last_name, employees.id, department_role.title, department_role.salary, department.name ";
    query += "FROM employees INNER JOIN department_role ON (employees.role_id = department_role.id)";
    query += "INNER JOIN department ON (department_role.department_id = department.id)";
    query += "ORDER BY employees.id";
    connection.query(query, function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
        console.log(`| ${results[i].id} | ${results[i].first_name} ${results[i].last_name} | ${results[i].name} | ${department.name} | ${results[i].title} | ${results[i].salary} | `)
    }
    
    runSearch();
})
}

//Displays the name and ID of all of the department names
//Brings up start questions
function allDepartments () {
    var query = "SELECT * FROM department ORDER BY department.id";
    connection.query(query, function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
        console.log(`| ${results[i].id} | ${results[i].name} | `)
    }
    
    runSearch();
})
}

//Displays all of the necessary information of a role in a company
//Brings up start questions
function allRoles() {
    var query = "SELECT * FROM department_role ";
    query += "ORDER BY department_role.id";
    connection.query(query, function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(`| ${results[i].id} | ${results[i].title} | ${results[i].salary} | ${results[i].department_id} `)
        }
        
        runSearch();
})
}

//Selects all employees in chosen department
//Displays those employees
//Brings up start questions
function employeesDepartment() {
    inquirer.prompt ({
        name: "department",
        type: "rawlist",
        message: "What department do you want to search by?",
        choices: departments
        
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

//Selects all employees in chosen role
//Displays those employees
//Brings up start questions
function employeesRoles() {
    inquirer.prompt ([
        {
            name: "role",
            type: "rawlist",
            message: "What role do you want to search by?",
            choices: roles
        },
    ]).then(function(answer) {
        var query = "SELECT department.name, employees.first_name, employees.last_name, employees.id ";
        query += "FROM employees INNER JOIN department_role ON (employees.role_id = department_role.id)";
        query += "INNER JOIN department ON (department_role.department_id = department.id)";
        query += "WHERE ( department_role.title = ?)";
        query += "ORDER BY employees.id";
        connection.query(query, [answer.role], function(err, res){
            if (err) throw err;
            for (i = 0; i < res.length; i ++) {
                console.log(`| ${res[i].id} |  ${res[i].first_name} ${res[i].last_name} |`);
            }

            runSearch();
        })


    });
}

//Adds a new employee to the employees table 
//Brings up start questions
function addEmployee() {
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
        message: "What role do you want your employee to have?",
        choices: roles
    },


]).then(function (responses) {
    var roleNumber;
    //This translates the role chosen into its corresponding number and stores it in roleNumber
    connection.query("SELECT department_role.id, department_role.title FROM department_role", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++ ) {
            if (res[i].title === responses.role) {
                roleNumber = res[i].id;
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

//This adds a new department into both the department table and the departments array
//Brings up start questions
function addDepartment() {
    inquirer.prompt ([
        {
            name: "department",
            type: "input",
            message: "What would you like the name of your new department to be?"

        }
    ]).then(function(response) {
        connection.query("INSERT INTO department SET ?",
        {
            name: response.department
        },
        function(err) {
            if (err) throw err;
            console.log("Added department successfully")
            departments.push(response.department)
            runSearch();

        })
    });
}

//Adds a new role into both the department_role table and the roles array
//Brings up start questions
function addRole() {
    inquirer.prompt ([
        {
            name: "role",
            type: "input",
            message: "What would you like the name of your new role to be?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of your new job? No commas, and have two decimal places"
        },
        {
            name: "department",
            type: "rawlist",
            choices: departments

        }
    ]).then(function(response) {
        var departmentNumber;
        //This translates the department chosen into its corresponding number and stores it in departmentNumber
        connection.query("SELECT department.id, department.name FROM department", function(err, res) {
            for (var i = 0; i < res.length; i++ ) {
                if (res[i].name === response.department) {
                departmentNumber = res[i].id;
                }
            }
    
            connection.query("INSERT INTO department_role SET ?",
                {
                    title: response.role,
                    salary: response.salary,
                    department_id: departmentNumber
                },
            function(err) {
            if (err) throw err;
            console.log("Added role successfully")
            roles.push(response.role);
            runSearch();

            });
        });
    });
}

//This updates the chosen employees' role
//Brings up start questions
function updateRole() {
        inquirer.prompt ([
            {
                name: "idNumber",
                type: "input",
                message: "What is the id number of the employee you want to update?"
            }
        ]).then(function(response) {
            //We use variable getID to update the employee's role
            var getID = parseInt(response.idNumber)
            var query = "SELECT * FROM employees "
            connection.query(query, function(err, res) {
                //This translates the id chosen into its corresponding employees name for a confirmation
                for (i = 0; i<res.length; i ++) {
                    if (getID === res[i].id){
                        console.log("Updating " + res[i].first_name + " " + res[i].last_name + "'s Role");
                    }
                }
                inquirer.prompt ([
                    {
                        name: "newRole",
                        type: "rawlist",
                        choices: roles,
                        message: "What do you want your new role to be?"

                    }
                ]).then(function(response) {
                    var roleID;
                    connection.query("SELECT * FROM department_role", function(err, results) {
                        //This translates the role chosen into its corresponding number and stores it in roleID
                        for (i = 0; i< results.length; i++) {
                            if (response.newRole === results[i].title) {
                                roleID = results[i].id
                            }
                        }
                        connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [roleID, getID], function(err, result) {
                            console.log("Updated role");
                            runSearch(); 
                        });
                        
                    })
                   
                })
              
            });
        
        })

   
}

//This function pushes all previously defined roles into the empty roles array 
function getRoles() {
    var query = "SELECT department_role.title "
    query += "FROM department_role"
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i ++) {
            roles.push(res[i].title);
        }
    return roles
    }) 
}

//This function pushes all previously defined departments into the empty departments array 
function getDepartments() {
    var query = "SELECT department.name "
    query += "FROM department"
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i ++) {
            departments.push(res[i].name);
        }
    return departments;
    }) 
}

//runs the functions to populate departments and roles arrays
getRoles();
getDepartments();