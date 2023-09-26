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
  
const updateEmp = [
    {
        type: "list",
        name: "updateWho",
        message: "Which employee's role do you want to update?",
        choices: ["Linda Vuong", "Allie Deaver", "Malia Cho", "Vanna Luciano", "Chan Nguyen", "Krystian Kowalak", "Matthew Galvin"]
    }
]

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
        inquirer.prompt([
            {
                name: "name",
                message: "What is the name of the department?"
            }
        ])
        .then((answer) => {
            connection
            .promise()
            .query(
                "INSERT INTO department SET ?",
                answer,
            )
            .then(() => console.log(`Department ${answer.name} has been added.`));
        })
    }
    else if (answer.userChoice == "Add a role") {
        inquirer.prompt([
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
                name: "roleDepartment_Id",
                message: "Which department does the role belong to?",
                choices: ["Management", "Sales Rep", "Marketing", "Security"]
            }
        ])
        .then((answer) => {
            connection
            .promise()
            .query(
                "INSERT INTO role SET ?",
                {
                    title: answer.roleName,
                    salary: answer.roleSalary,
                    department_id: answer.roleDepartment_Id,
                },
                function(err, results,) {
                console.log(results);
                }
            )
            .then(() => console.log(`Role ${answer.roleName} has been added.`));
        })
    }
    else if (answer.userChoice == "Add an employee") {
        inquirer.prompt([
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
                choices: ["Manager", "Budtender", "Social Media Manager", "Delivery Driver", "Security Guard"]
            },
            {
                type: "list",
                name: "empMngr",
                message: "Who is employee's manager?",
                choices: ["Linda Vuong", "NULL"]
            }
        ])
        .then((answer) => {
            connection.query(
                "INSERT to `employee` SET ?",
                [
                    {
                        role_id: answer.role_id,
                    },
                    {
                        id: answer.employee_id,
                    }
                ],
                function(err, results,) {
                console.log(results);
                }
            );
        })
    }
    else if (answer.userChoice == "Update an employee role") {
        connection.query(
            "UPDATE `employee` SET ? WHERE ?",
            function(err, results,) {
            console.log(results);
            }
        );
    }
});

