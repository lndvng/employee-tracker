const inquirer = require('inquirer');

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'drinkmilk',
  database: 'cms_db'
});

const questions = [
    {
      type: 'list',
      name: 'userChoice',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', "Add a role", "Add an employee", "Update an employee role"]
    },
  ];
  

inquirer.prompt(questions)
.then((answer) => {
    if (answer.userChoice == 'View all departments') {
        connection.query(
            'SELECT * FROM `department`',
            function(err, results,) {
              console.log(results);
            }
          );
    }   
    else if (answer.userChoice == 'View all roles') {
        connection.query(
            'SELECT * FROM `role`',
            function(err, results,) {
              console.log(results);
            }
          );
    }
    else if (answer.userChoice == 'View all employees') {
        connection.query(
            'SELECT * FROM `employee`',
            function(err, results,) {
              console.log(results);
            }
          );
    }
    else if (answer.userChoice == 'Add a department') {
        
    }
    else if (answer.userChoice == 'Add a role') {
        
    }
    else if (answer.userChoice == 'Add an employee') {
        
    }
    else if (answer.userChoice == 'Update an employee role') {
        
    }
    
});