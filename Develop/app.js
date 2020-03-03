const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];
function init() {
    inquirer
        .prompt(
            [
                {
                    type: "input",
                    message: "Enter employee name: ",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Enter employee ID: ",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Enter employee email: ",
                    name: "email"
                },
                {
                    type: "list",
                    message: "Select employee role: ",
                    name: "role",
                    choices: ["Intern", "Engineer", "Magaer"]
                }
            ]
        )
        .then(function ({ name, id, email, role }) {
            switch (role) {
                case Intern:
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Enter intern's school: ",
                            name: "school"
                        }
                    ]).then(function ({ school }) {
                        const newIntern = new Intern(name, id, email, school);
                        employeeList.push(newIntern);
                        return newIntern;

                    });
                case Engineer:
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Enter engineer's Github account: ",
                            name: "github"
                        }
                    ]).then(function ({ github }) {
                        const newEngineer = new Engineer(name, id, email, github);
                        employeeList.push(newEngineer);
                        return newEngineer;

                    });
                case Manager:
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "Enter manager's office number: ",
                            name: "officeNumber"
                        }
                    ]).then(function ({ officeNumber }) {
                        const newManager = new Manager(name, id, email, officeNumber);
                        employeeList.push(newManager);
                        return newManager;

                    });

            }
        })
}

module.exports = {newIntern, newEngineer, newManager};

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct class as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
