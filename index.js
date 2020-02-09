const Inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const GenerateManager = require('./genManager');
const GenerateEngineer = require('./genEngineer');
const GenerateIntern = require('./genIntern');
const GenerateHTML = require('./genHTML');

const teamMembers = [];

const member = {
  role: '',
  name: '',
  id: '',
  email: '',
  other: '',
};

const mgr = new Manager('Scott Tefft', 1, 'scotttefft@aol.com', 122);
let htm = GenerateManager.generateHTML(mgr);

const eng = new Engineer('Jeff Bell', 2, 'jeff.bell@sprint.com', 'codemaster-jab');
htm += GenerateEngineer.generateHTML(eng);

const int = new Intern('Bob Smith', 3, 'bob.smith@devry.edu', 'DeVry');
htm += GenerateIntern.generateHTML(int);

htm = GenerateHTML.generateHTML(htm);
fs.writeFile('./output/team.html', htm, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Success! File written to ./output/team.html');
});
