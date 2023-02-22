const inquirer = require("inquirer");
const database = require("./helper/database");

async function menu() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Departments",
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
        const employees = await viewAllEmployees();
        console.table(employees);
        await menu();
        break;
    }
    case "Add a Department": {
        await addDepartment();
        await menu();
        break;

    }
    case "Add a Role": {
        await addRole();
        await menu();
        break;

    }
    case "Add an Employee": {
        await addEmployees();
        await menu();
        break;
    }
    default: {
        process.exit(0);
    }
  }
}

async function viewAllDepartments() {
const departments = await database.viewAllDepartments();
console.table(departments);
}

async function viewAllRoles() {
    const roles = await database.viewAllRoles();
    console.table(roles);
}

async function viewAllEmployees(){
    const employees = await database.viewAllEmployees();
    return employees
}

async function addDepartment() {
    const answer = await inquirer.prompt([{
        type: "input",
        message: "what is the the name of this new department?",
        name: "departmentName"
    }]);
    await database.addDepartment(answer.departmentName);
    console.log("department added");
}

async function addRole() {
    const departments = await database.viewAllDepartments();
    const answers = await inquirer.prompt([
        {
            type: "input",
            message: "what is the title of the role?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary for the role?",
            name: "salary" 
        },
        {   type: "list",
            messege:"What department does this role belong to?",
            choices: departments.map(department => department.name),
            name: "department"
        }
    ]);
    for(let i = 0; i < departments.length; i++) {
        if(answers.department === departments[i].name) {
            console.log(departments[i].id);
            await database.addRole(answers.title, answers.salary, departments[i].id);

        }
    }
    console.log("Role added!");
}

async function addEmployees() {
const roles = await database.viewAllRoles();
console.log(roles);
const rolesTitle = roles.map(role => role.title);
const managers = await database.viewAllEmployees();
console.log(managers);
const managersName = managers.map((manager) => {
    return `${manager.first_name} ${manager.last_name}`
});
managersName.push("No Manager");

let roleId;
let manager_Id;

const answers = await inquirer.prompt([
 {
    type: "input",
    message: "what is the employees first name?",
    name: "firstName"
 },
 {
    type: "input",
    message: "what is the employees last name?",
    name: "lastName"
 },
 {
    type: "list",
    message: "what is the the employees role?",
    choices: rolesTitle,
    name: "role"
 },
 {
 type: "list",
 message: "who is the the employees manager?",
 choices: managersName,
 name: "manager"
}
]);
for(let i = 0; i < roles.length; i++) {
    if(answers.role === roles[i].title) {
        roleId = roles[i].id;
    }
}
for(let i = 0; i < managers.length; i++) {
    if(answers.manager === `${manager.first_name} ${manager.last_name}`) {
        manager_Id = managers[i].id
    }  
}
if(!manager_Id) {
    managerId = null
}
await database.addEmployees(answers.first_name, answers.last_name, roleId, manager_Id);
console.log("Employee Added");
}


menu();
