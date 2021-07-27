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
        runSearch();
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

function roleSearch() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleOptions.push(data[i].id + "-" + data[i].title)
        }
    })
}