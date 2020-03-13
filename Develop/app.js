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
function newEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select employee role: ",
                name: "role",
                choices: ["Intern", "Engineer", "Manager", "Done"]
            }
        ]).then(function (response) {
            console.log(response.role);
            switch (response.role) {
                case "Intern":
                    newIntern();
                    break;
                case "Engineer":
                    newEnginer();
                    break;
                case "Manager":
                    newManager();
                    break;
                case "Done":
                    saveList();
            };

        }).catch(err => console.log(err));

    console.log(employeeList);
};
function newFile(employeeList){ 
    fs.writeFile(outputPath, employeeList, function (err) {
        if (err) throw err;
    });
};

function saveList() {
    console.log("Finished creating employees... making directory: ");
    console.log("Employees created: " + employeeList);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
        var htmlRender = render(employeeList);
        newFile(htmlRender);

    }
    else {
        var htmlRender = render(employeeList);
        newFile(htmlRender);
    }

};

function newManager() {
    console.log("New Manager");
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
                    type: "input",
                    message: "Enter manager's office number: ",
                    name: "officeNumber"
                }
            ]).then(function (response) {
                let manager = new Manager(reponse.name, response.id, response.email, response.officeNumber);
                employeeList.push(manager);
                console.log(manager);
                newEmployee();
            });
    
};

function newEnginer() {
    console.log("New Engineer");
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
                    type: "input",
                    message: "Enter engineer's Github account: ",
                    name: "github"
                }
            ]).then(function (response) {
                let engineer = new Engineer(response.name, response.id, response.email, response.github);
                employeeList.push(engineer);
                console.log(engineer);
                newEmployee();

            });
};

function newIntern() {
    console.log("New Intern");
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
                    type: "input",
                    message: "Enter intern's school: ",
                    name: "school"
                }
            ]).then(function (response) {
                let intern = new Intern(response.name, response.id, response.email, response.school);
                employeeList.push(intern);
                console.log(intern);
                newEmployee();

            });
};

newEmployee();