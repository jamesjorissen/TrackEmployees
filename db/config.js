var mysql = require("mysql");
const { user, password } = require("./config");
var connection = mysql.createConnection({

    host: "local",
    port: 3306,
    user: "root",
    password: "Goonsquad88$",
    database: "employeetracker"
});

connection.connect((err) => {
    if (err) throw err;
    Search();
});

module.exports = connection;