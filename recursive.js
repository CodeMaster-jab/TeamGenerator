/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const GenerateManager = require('./genManager');
const GenerateEngineer = require('./genEngineer');
const GenerateIntern = require('./genIntern');
const GenerateHTML = require('./genHTML');

function GenMembersHTML(users) {
  let htm = '';
  users.forEach((usr) => {
    switch (usr.role) {
      case 'Manager':
        const mgr = new Manager(usr.name, usr.id, usr.email, usr.other);
        htm += GenerateManager.generateHTML(mgr);
        break;
      case 'Engineer':
        const eng = new Engineer(usr.name, usr.id, usr.email, usr.other);
        htm += GenerateEngineer.generateHTML(eng);
        break;
      case 'Intern':
        const int = new Intern(usr.name, usr.id, usr.email, usr.other);
        htm += GenerateIntern.generateHTML(int);
        break;
    } // End of Switch
  }); // End of forEach
  return htm;
}
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

inquirer.prompt([{
  type: 'recursive',
  message: 'Add a new Team Member ?',
  name: 'users',
  prompts: [
    {
      type: 'list',
      message: 'Choose member Role:',
      name: 'role',
      choices: [
        'Manager',
        'Engineer',
        'Intern',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the member\'s Name?',
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'Name is required';
      },
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter member ID:',
      validate(value) {
        const digitsOnly = /\d+/;
        if (digitsOnly.test(value)) { return true; }
        return 'Invalid ID! Must be a number!';
      },
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter the member\'s Email:',
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'Email is required';
      },
    },
    {
      when(response) {
        if (response.role === 'Manager') {
          return true;
        }
        return false;
      },
      type: 'input',
      name: 'other',
      message: 'Enter the Manager\'s Office Number:',
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'Office Number is required';
      },
    },
    {
      when(response) {
        if (response.role === 'Engineer') {
          return true;
        }
        return false;
      },
      type: 'input',
      name: 'other',
      message: 'Enter the Engineer\'s GitHub Username:',
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'GitHub Username is required';
      },
    },
    {
      when(response) {
        if (response.role === 'Intern') {
          return true;
        }
        return false;
      },
      type: 'input',
      name: 'other',
      message: 'Enter the Intern\'s School Name:',
      validate(value) {
        if ((/.+/).test(value)) { return true; }
        return 'School Name is required';
      },
    },
  ],
}]).then((members) => {
  let htm = GenMembersHTML(members.users);
  htm = GenerateHTML.generateHTML(htm);
  fs.writeFile('./output/team.html', htm, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Success! File written to ./output/team.html');
  });
});
