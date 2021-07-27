var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeetracker"
});

connection.connect((err) => {
    if (err) throw err;
    Search();
});

function Search() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "Choose from the following:",
            choices:
                [
                    "View employees",
                    "View departments",
                    "View employee roles",
                    "Add an employee",
                    "Add a department",
                    "Add a new role to an existing employee",
                    "Update employee information",
                ]

        })
        .then(function (answer) {
            console.log(answer);

            if (answer.choice === "View employees") {
                viewEmployees();
            }
            else if (answer.choice === "View departments") {
                viewDepartments();

            }
            else if (answer.choice === "View employee roles") {
                viewEmployeeRoles();

            }
            else if (answer.choice === "Add an employee") {
                addAnEmployee();

            }
            else if (answer.choice === "Add a department") {
                addADepartment();

            }
            else if (answer.choice === "Add a new role to an existing employee") {
                addRole();

            }
            else if (answer.choice === "Update Employee") {
                updateEmployee();

            } else {
                connection.end();
            }
        });
}

function viewEmployees() {
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
        function (err, result, options) {
            if (err) throw err;
            console.table(result);
            Search();
        }
    );
};
function viewEmployeeRoles() {
    connection.query(
        "SELECT role.id, role.title, role.salary, role.department_id, department.id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
        function (err, result, options) {
            if (err) throw err;
            console.table(result);
            // re-prompt the user for another selection
            Search();
        }
    );
};

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, result, options) {
        if (err) throw err;
        console.table(result);
        // re-prompt the user for another selection
        Search();
    }
    );
};

var departmentOptions = [];
var employeeOptions = [];
var roleOptions = [];

function departmentSearch() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            departmentOptions.push(data[i].id + "-" + data[i].name)
        }
    })
}

function employeeSearch() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            employeeOptions.push(data[i].id + "-" + data[i].first_name + " " + data[i].last_name)
        }
    })
}

function roleSearch() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleOptions.push(data[i].id + "-" + data[i].title)
        }
    })
}


function addAnEmployee() {

    roleSearch()
    employeeSearch()

    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter the employee's first name here: "
        },

        {
            name: "last_name",
            type: "input",
            message: "Enter the employee's last name here: "
        },
        {
            name: "role",
            type: "list",
            message: "Enter the employee's role here: ",
            choices: roleOptions
        },
        {
            name: "managerInfo",
            type: "list",
            message: "Enter the employee's manager here: ",
            choices: employeeOptions
        }
    ]).then(function (answer) {
        var getId = answer.role.split("-")
        var getManagerInfoId = answer.managerInfo.split("-")
        var query =
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
     VALUES ('${answer.first_name}','${answer.last_name}','${getId[0]}','${getManagerInfoId[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`new employee ${answer.first_name} ${answer.last_name} added!`)
        });
        Search();
    });
};
function addRole() {

    roleSearch()
    employeeSearch()
    departmentSearch()

    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter your new role: "
        },

        {
            name: "department",
            type: "list",
            message: "Please specify this role's department: ",
            choices: departmentOptions
        },

        {
            name: "salary",
            type: "number",
            message: "Enter the salary here: "
        },
    ]).then(function (answer) {
        console.log(`${answer.role}`)
        var getDepartmentId = answer.department.split("-")
        var query =
            `INSERT INTO role (title, salary, department_id)
        VALUES ('${answer.role}','${answer.salary}','${getDepartmentId[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`<br>new role ${answer.role} added!`)
        });
        Search();
    });
};

function addADepartment() {
    roleSearch()
    employeeSearch()
    departmentSearch()

    inquirer.prompt([
        {
            name: "dept",
            type: "input",
            message: "Enter the department you would like to add:"
        }
    ]).then(function (answer) {
        var query =
            `INSERT INTO department (name) VALUES ('${answer.department}')`;
        connection.query(query, function (err, res) {
            console.log(`new department added: ${answer.department}`)
        });
        Search();
    });
};
