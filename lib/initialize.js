var shell = require('shelljs');
var fs = require('fs');

module.exports = {
  initialize: function(name, options) {
    this.installNode(name);
    this.installDBClient(options.db_client);

    // TODO: Create index.js

    // TODO: Create server.js
    this.writeServerJS(name);

    // TODO: Create API folder structure /api/models/ /api/routes/
  },
  installNode: function(name) {
    console.log(`\nCreating ${name} directory...`);
    shell.exec(`mkdir ${name}`);
    console.log('Writing to package.json...');
    shell.exec(`cd ${name} && npm init -y`);
    console.log('\nInstalling Express...');
    shell.exec(`cd ${name} && npm install express --save`);
    console.log('\nInstalling BodyParser...');
    shell.exec(`cd ${name} && npm install body-parser --save`);
  },
  installDBClient: function(db_client) {
    if (db_client === 'Mongoose') {
      console.log(`\nInstalling Mongoose...`);
      shell.exec(`cd ${name} && npm install mongoose --save`);
    }
  },
  writeServerJS: function(name) {
    console.log('Writing to server.js...');
    shell.exec(`cd ${name} && echo.>>server.js`);
    const serverText =
      "const http = require('http');\nconst app = require('./app');\n\nconst port = process.env.PORT || 3000;\nconst server = http.createServer(app);\n\nserver.listen(port);\n";

    fs.writeFile(`${name}/server.js`, serverText, (err) => {
      if (err) {
        throw err;
      }
      console.log('File saved');
    });
  },
};
