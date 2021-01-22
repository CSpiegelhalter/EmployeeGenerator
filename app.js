const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { title } = require("process");

let email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let word = /^[a-zA-Z]+ [a-zA-Z]+$/;
let phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
let github = /\B@(?!.*(-){2,}.*)[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\b/ig;

let teamMembers = []
let usedIds = []

let response;
let employee;
let decision;
let job;
let other;



    

function createEmployee(newJob) {

    //generates random id;
    let newId = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + '-' + s4()
    }

    if (!usedIds.includes(newId)) {
        id = newId
        usedIds.push(id)
    }            

    if (newJob == 'Manager') {
        job = 'manager';
        other = 'office-number';
        inquirer.prompt([
            {
        
                type: 'input',
                name: 'managerName',
                message: "What is your manager's name?",
                validation: val => word.test(val),
        
            },
        
            {
        
                type: 'input',
                name: 'managerEmail',
                message: "What is your manager's email?",
                validation: val => email.test(val)
        
            },
        
            {
        
                type: 'input',
                name: 'number',
                message: "What is your manager's office number?",
                validation: val => phone.test(val),
            }

            ]).then((response) => {
                employee = new Manager(response.managerName, id, response.managerEmail, response.number)
                teamMembers.push(employee)
                addMore()
            });
        }


    else if (newJob == 'Engineer') {
        job = 'engineer';
        other = 'Github';
        inquirer.prompt([
            {
        
                type: 'input',
                name: 'engineerName',
                message: "What is your engineer's name?",
                validation: val => word.test(val),
        
            },
        
            {
        
                type: 'input',
                name: 'engineerEmail',
                message: "What is your engineer's email?",
                validation: val => email.test(val),
        
            },
        
            {
        
                type: 'input',
                name: 'github',
                message: "What is your engineer's Github username?",
                validation: val => github.test(val),
            }

            ]).then((response) => {
                employee = new Engineer(response.engineerName, id, response.engineerEmail, response.Github)
                teamMembers.push(employee)
                addMore()
            });
        }
        
        

    else if (newJob == 'Intern') {
        job = 'intern';
        other = 'school';
        inquirer.prompt([
            {
        
                type: 'input',
                name: 'internName',
                message: "What is your intern's name?",
                validation: val => word.test(val),
        
            },
        
            {
        
                type: 'input',
                name: 'internEmail',
                message: "What is your intern's email?",
                validation: val => email.test(val),
        
            },
        
            {
        
                type: 'input',
                name: 'school',
                message: "What is your intern's school?",
                validation: val => number.test(val),
            }

            ]).then((response) => {
                employee = new Intern(response.internName, id, response.internEmail, response.school)
                teamMembers.push(employee)
                addMore()
            });
    }
    
    else{
        console.log("Invalid parameters")
    }

}

        



function addEmployee() {
    inquirer.prompt([

        {

            type: 'list',
            name: 'title',
            message: 'What employee would you like to add?',
            choices: ['Intern', 'Manager', 'Engineer'],

        }
        

    ]).then((data) => {
        var newJob = data.title;
        console.log(newJob)
        createEmployee(newJob)
    })
}



function addMore() {
    inquirer.prompt([

        {
            type: 'confirm',
            name: 'more',
            message: `Would you like to add more employees?`,

        }
    ]).then((answer) => {
        console.log(answer)
        if (answer.more == true) {
            addEmployee()
        }
        else{
            let loadHtml = render(teamMembers)
            fs.writeFile('./output/team.html', loadHtml, function (err) {
                if (err) return console.log(err);
                console.log('Hello World > helloworld.txt');
              });
        }
    })
}



addEmployee()

    






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
// for the provided `render` function to work! ```
