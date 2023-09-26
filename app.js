// import packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "drinkmilk",
  database: "cms_db"
});

// array for user input
const questions = [
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
];

const addRole = [
    {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?"
    },
    {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role?"
    },
    {
        type: "list",
        name: "roleDep",
        message: "Which department does the role belong to?",
        choices: []
    }
];

const updateEmployee = [
    {
        type: "input",
        name: "empFirstName",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "empLastName",
        message: "What is the employee's last name?"
    },
    {
        type: "list",
        name: "empRole",
        message: "What is the employee's role?",
        choices: []
    },
    {
        type: "list",
        name: "empMngr",
        message: "Who is employee's manager?",
        choices: []
    },
];
  

inquirer.prompt(questions)
.then((answer) => {
    if (answer.userChoice == "View all departments") {
        connection.query(
            "SELECT * FROM `department`",
            function(err, results,) {
              console.log(results);
            }
          );
    }   
    else if (answer.userChoice == "View all roles") {
        connection.query(
            "SELECT * FROM `role`",
            function(err, results,) {
              console.log(results);
            }
          );
    }
    else if (answer.userChoice == "View all employees") {
        connection.query(
            "SELECT * FROM `employee`",
            function(err, results,) {
              console.log(results);
            }
          );
    }
    else if (answer.userChoice == "Add a department") {
        connection.query(
            "INSERT INTO `department`",
            function(err, results,) {
              console.log(results);
            }
          );
    }
    else if (answer.userChoice == "Add a role") {
        connection.query(
            "INSERT INTO `role`",
            function(err, results,) {
              console.log(results);
            }
          );
    }
    else if (answer.userChoice == "Add an employee") {
        connection.query(
            "INSERT INTO `employee`",
            function(err, results,) {
              console.log(results);
            }
          );
    }
    else if (answer.userChoice == "Update an employee role") {
        
    }
    
});