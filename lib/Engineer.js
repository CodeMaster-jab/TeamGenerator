const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name = '', id = 0, email = '', github = 0) {
    super(name, id, email);
    this.github = github;
  }

  getGitHub() {
    return this.github;
  }

  getRole() {
    return 'Engineer';
  }
}

module.exports = Engineer;
