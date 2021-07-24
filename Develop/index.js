const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")

const fs = require("fs")
const path = require("path")
const generateHtml = require("./util/generateHtml")
const inquirer = require("inquirer")
const OUTPUT_DIR = path.resolve(__dirname, 'OUTPUT')
const outputPath = path.join(OUTPUT_DIR, "team.html")
const teamMembers = []
const idArray = []

function teamQuestions(){
    function createManager(){
        inquirer.prompt ([
            {
                type: "input",
                name: "managerName",
                message: "What is your Manager's name?",
                validate: answer => {
                    if(answer!==""){
                        return true
                    }return "Try again, you blew it"
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your Manager ID?",
                validate: answer => {
                    if(answer!==""){
                        return true
                    }return "Try again, you blew it"
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your Manager's email?",
                validate: answer => {
                    if(answer!==""){
                        return true
                    }return "Try again, you blew it"
                }
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your office number?",
                validate: answer => {
                    if(answer!==""){
                        return true
                    }return "Try again, you blew it"
                }
            }
        ]).then(answers => {
            const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber)
            teamMembers.push(manager)
            idArray.push(answers.managerId)
            createTeam()
        })
    }
   function createTeam(){
       inquirer.prompt([
           {
               type: "list",
               name: "rollChoice",
               message: "Would you like to add a team member?",
               choices: ["Engineer", "Intern", "done creating team"]

           }
       ])
       .then(userChoice => {
           switch(userChoice.rollChoice){
               case "Engineer":
                   createEngineer()
                   break;
                   case "Intern":
                       createIntern()
                           break;
                           default:
                               writeToFile()

                               
                       
           }
       })
   }
   function createEngineer(){
    inquirer.prompt ([
        {
            type: "input",
            name: "engineerName",
            message: "What is your Engineer's name?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your Engineer ID?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your Engineer's email?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        },
        {
            type: "input",
            name: "gitHub",
            message: "What is your Engineer's GitHub?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        }
    ]).then(answers => {
        const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.gitHub)
        teamMembers.push(engineer)
        idArray.push(answers.engineerId)
        createTeam()
    })   
   }
   function createIntern(){
    inquirer.prompt ([
        {
            type: "input",
            name: "internName",
            message: "What is your Intern's name?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern ID?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your Intern's email?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is your Intern's Alma Mater?",
            validate: answer => {
                if(answer!==""){
                    return true
                }return "Try again, you blew it"
            }
        }
    ]).then(answers => {
        const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.school)
        teamMembers.push(intern)
        idArray.push(answers.internId)
        createTeam()
    })
   }
   function writeToFile() {
       if(!fs.existsSync(OUTPUT_DIR)){
           fs.mkdirSync(OUTPUT_DIR)
       }
       fs.writeFileSync(outputPath, generateHtml(teamMembers), "utf-8")
    
}
createManager()
}
teamQuestions()


