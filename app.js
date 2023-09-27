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
  
const updateEmp = 

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
                type: "input",
                name: "roleDepartment_Id",
                message: "Which department does the role belong to? Please enter the corresponding number: (1)Manager, (2)Budtender, (3)Social Media Manager, (4)Delivery Driver, (5)Security Guard"
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
            .then(() => console.log(`Employee ${answer.empFirstName} has been added.`));
        })
    }
    else if (answer.userChoice == "Update an employee role") {
        inquirer.prompt([
            {
                type: "input",
                name: "newFirstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "newLastName",
                message: "What is the employee's last name?"
            },
            {
                type: "input",
                name: "newRoleId",
                message: "Please enter the corresponding number for new role ID: (1)Manager, (2)Budtender, (3)Social Media Manager, (4)Delivery Driver, (5)Security Guard"
            }
        ])
        .then((answer) => {
            connection
            .promise()
            .query(
                "UPDATE `employee` SET ? WHERE ?",
                {
                    role_id: answer.newRoleId,
                    employee_id: role_id
                }
            )
            .then(() => console.log(`${answer.updateWho}'s role has been set`));
        })
    }
});