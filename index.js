const inqurer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
const { async } = require("rxjs");
const database = require("./helper/database");

async function menu() {
  const answers = await inqurer.prompt([
    {
      type: "list",
      Message: "What would you like to do?",
      Choices: [
        "View all Departmets",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Quit"
      ],
      name: "userChoice"
    },
  ]);
  switch(answers.userChoice){
    case "View all Departments": {
        await viewAllDepartments();
        await menu();
        break;
    }
    case "View all Roles": {
        await viewAllRoles();
        await menu();
        break;
    }
    case "View all Employees": {    
        await viewAllEmployees();
        await menu;
        break;
    }
    case "Add a Department": {
        await addDepartment();
        await menu();
        break;

    }
    case "Add a role": {
        await addRole();
        await menu();
        break;

    }
    case "Add an Employee": {
        
        break;
    }
    default: {
        proces.exit(0);
    }
  }
}

async function viewAllDepartments() {
const departments = await database.viewAllDepartments();
console.table(departments);
}

async function viewAllRoles() {
    const roles = await database.viewAllRoles();
    console.tablr(roles);
}

async function viewAllEmployees(){
    const employees = await database.viewAllEmployees();
    console.table(employees);
}

async function addDepartment() {
    const answer = await inqurer.prompt([{
        type: "input",
        messege: "what is the the name of this new department?",
        name: "departmentName"
    }]);
    await database.addDepartment(answer.departmentName);
    console.log("department added");
}

async function addRole() {
    const departments = await database.viewAllDepartments();
    const answers = await inqurer.prompt([
        {
            type: "input",
            messege: "what is the tutle of the role?",
            name: "title"
        },
        {
            type: "input",
            messege: "What is the salary for the role?",
            name: "salary" 
        },
        {   type: "list",
            messege:"What department does this role belong to?",
            choices: departments,
            name: "department"
        }
    ]);
    for(let i = 0; i < departments.length; i++) {
        if(answers.department === departments[i].name) {
            console.log(departments[i].id);
            await database.addRole(answers.title, answers.salary, departments[i]);
        }
    }
    console.log("Role added!");
}

async function addEmployees() {

}


menu();