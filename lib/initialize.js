const shell = require('shelljs');
const fs = require('fs');

const app_name = '';

module.exports = {
  initialize: function(name, options) {
    app_name = name;
    this.installNode();
    this.installDBClient(options.db_client);

    // TODO: Create index.js

    // TODO: Create server.js
    this.writeServerJS();

    // TODO: Create API folder structure /api/models/ /api/routes/
  },
  installNode: function() {
    console.log(`\nCreating ${app_name} directory...`);
    shell.exec(`mkdir ${app_name}`);
    console.log('Writing to package.json...');
    shell.exec(`cd ${app_name} && npm init -y`);
    console.log('\nInstalling Express...');
    shell.exec(`cd ${app_name} && npm install express --save`);
    console.log('\nInstalling BodyParser...');
    shell.exec(`cd ${app_name} && npm install body-parser --save`);
  },
  installDBClient: function(db_client) {
    if (db_client === 'Mongoose') {
      console.log(`\nInstalling Mongoose...`);
      shell.exec(`cd ${app_name} && npm install mongoose --save`);
    }
  },
  writeServerJS: function() {
    console.log('Writing to server.js...');
    shell.exec(`cd ${app_name} && echo.>>server.js`);
    const serverText =
      "const http = require('http');\nconst app = require('./app');\n\nconst port = process.env.PORT || 3000;\nconst server = http.createServer(app);\n\nserver.listen(port);\n";

    fs.writeFile(`${app_name}/server.js`, serverText, (err) => {
      if (err) {
        throw err;
      }
      console.log('File saved');
    });
  },
  writeIndexJS: function() {},
};
