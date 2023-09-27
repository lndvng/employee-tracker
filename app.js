// import packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
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

// function to call main menu
function mainMenu() {
    // displays main questions for user input
    inquirer.prompt(questions)
    .then((answer) => {
        // departments table will display if 'view all departments' is selected
        if (answer.userChoice == "View all departments") {
            connection.query(
                "SELECT * FROM `department`",
                function(err, results,) {
                console.table(results);
                mainMenu()
                }                
            ); 
        }   
        // role table will display if 'view all roles' is selected
        else if (answer.userChoice == "View all roles") {
            connection.query(
                "SELECT * FROM `role`",
                function(err, results,) {
                console.table(results);
                mainMenu()
                }
            );
        }
        // employee table will display if 'view all employees is selected
        else if (answer.userChoice == "View all employees") {
            connection.query(
                "SELECT * FROM `employee`",
                function(err, results,) {
                console.table(results);
                mainMenu()
                }
            );
        }
        // follow up question for user input will display if 'add a department' is selected
        else if (answer.userChoice == "Add a department") {
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is the name of the department?"
                }
            ])
            // new department will be inserted into department table
            .then((answer) => {
                connection
                .promise()
                .query(
                    "INSERT INTO department SET ?",
                    answer,
                )
                console.log(`Department ${answer.name} has been added.`)
                mainMenu();
            })
    
        }
        // follow up questions for user input will display if 'add a role' is selected
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
                    type: "input",
                    name: "roleDepartment_Id",
                    message: "Which department does the role belong to? Please enter the corresponding number: (1)Manager, (2)Budtender, (3)Social Media Manager, (4)Delivery Driver, (5)Security Guard"
                }
            ])
            // new role will be inserted into role table
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
                console.log(`Role ${answer.roleName} has been added.`)
                mainMenu();
            })
        }
        // follow up questions for user input will display if 'add an employee' is selected
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
                    type: "input",
                    name: "empRole",
                    message: "What is the employee's role? Please enter the corresponding number: (1)Manager, (2)Budtender, (3)Social Media Manager, (4)Delivery Driver, (5)Security Guard",
                },
                {
                    type: "input",
                    name: "empMngr",
                    message: "Who is employee's manager? Please enter the corresponding number: (1)Linda Vuong, or hit enter for NULL",
                }
            ])
            // new employee will be inserted into employee table
            .then((answer) => {
                connection
                .promise()
                .query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.empFirstName,
                        last_name: answer.empLastName,
                        role_id: answer.empRole,
                        manager_id: answer.empMngr,
                    },
                )
                console.log(`Employee ${answer.empFirstName} has been added.`)
                mainMenu();
            })
        }
        // follow up questions for user input will display if 'update an employee role' is selected
        else if (answer.userChoice == "Update an employee role") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "employeeId",
                    message: "Enter the ID of the employee whose role you want to update:"
                },
                {
                    type: "input",
                    name: "newRoleId",
                    message: "Please enter the corresponding number for the new role ID: (1)Manager, (2)Budtender, (3)Social Media Manager, (4)Delivery Driver, (5)Security Guard"
                }
            ])
            // employee roll will be updated into employee table
            .then((answer) => {
                connection
                .promise()
                .query(
                    "UPDATE employee SET role_id = ? WHERE employee_id = ?",
                    [answer.newRoleId, answer.employeeId]
                )
                .then(() => console.log(`Updated employee role with ID ${answer.employeeId} to role ID ${answer.newRoleId}`))
                .catch((err) => console.error("Error updating employee role:", err));
                mainMenu()
            })
        }
    });
};

// calling mainMenu function to display initial prompts
mainMenu();