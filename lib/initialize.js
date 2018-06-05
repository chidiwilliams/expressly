var shell = require('shelljs');

module.exports = {
  initialize: function(name, database, client) {
    console.log(`\nCreating ${name} directory...`);
    shell.exec(`mkdir ${name}`);
    console.log('\Writing to package.json...');
    shell.exec(`cd ${name} && npm init -y`);
    console.log('\nInstalling Express...');
    shell.exec(`cd ${name} && npm install express --save`);

    if (client == 'Mongoose') {
      console.log(`\nInstalling Mongoose...`);
      shell.exec(`cd ${name} && npm install mongoose --save`);
    }
  },
};
