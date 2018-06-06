const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs');

let app_config = {
  name: '',
  db: '',
  db_client: '',
};

let print_error = (err) => {
  if (err) {
    console.log(chalk.red(err));
  }
};

let printUpdate = (message) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(chalk.yellow(message));
};

let installModules = () => {
  printUpdate('Writing to package.json...');
  shell.exec(`cd ${app_config.name} && npm init -y`);
  printUpdate('\nInstalling Express...');
  shell.exec(`cd ${app_config.name} && npm install express --save`);
  printUpdate('\nInstalling BodyParser...');
  shell.exec(`cd ${app_config.name} && npm install body-parser --save`);
};

let installDBClient = () => {
  if (app_config.db_client === 'Mongoose') {
    printUpdate(`\nInstalling Mongoose...`);
    shell.exec(`cd ${app_config.name} && npm install mongoose --save`);
  }
};

let writeAppJS = () => {
  printUpdate('Writing to app.js...');
  shell.exec(`cd ${app_config.name} && echo.>>app.js`);

  // Requires
  fs.writeFileSync(
    `${app_config.name}/app.js`,
    "const express = require('express');\nconst bodyParser = require('body-parser');\n",
  );
  if (app_config.db_client === 'Mongoose') {
    fs.appendFileSync(
      `${app_config.name}/app.js`,
      "const mongoose = require('mongoose');\n",
    );
  }

  // App()
  fs.appendFileSync(
    `${app_config.name}/app.js`,
    '\nconst app = express();\nconst router = express.Router();\n\n',
  );

  // Pre-uses
  if (app_config.db_client === 'Mongoose') {
    fs.appendFileSync(
      `${app_config.name}/app.js`,
      "mongoose.connect('process.env.MONGO_DB_URL');\n\n",
    );
  }

  // Uses
  fs.appendFileSync(
    `${app_config.name}/app.js`,
    'app.use(bodyParser.urlencoded({ extended: false }));\napp.use(bodyParser.json());\n\n',
  );

  // Add Headers
  fs.appendFileSync(
    `${app_config.name}/app.js`,
    "app.use((req, res, next) => {\n  res.header('Access-Control-Allow-Origin', '*');\n  res.header(\n    'Access-Control-Allow-Headers',\n    'Origin, X-Requested-With, Content-Type, Accept, Authorization',\n  );\n  if (req.method === 'OPTIONS') {\n    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');\n    return res.status(200).json({});\n  }\n  next();\n  return true;\n});\n\n",
  );

  // Add routes
  fs.appendFileSync(
    `${app_config.name}/app.js`,
    "router.get('*', (req, res, next) => {\n  res.status(200).json({ message: 'Handling GET request to /' });\n});\napp.use('/', router);\n",
  );

  // Return exports
  fs.appendFileSync(`${app_config.name}/app.js`, '\nmodule.exports = app;\n');
};

let writeServerJS = () => {
  printUpdate('Writing to server.js...');
  shell.exec(`cd ${app_config.name} && echo.>>server.js`);

  fs.writeFileSync(
    `${app_config.name}/server.js`,
    "const http = require('http');\nconst app = require('./app');\n\nconst port = process.env.PORT || 3000;\nconst server = http.createServer(app);\n\nserver.listen(port);\n",
  );
};

let makeDirLayout = () => {
  printUpdate('Creating API directory structure...');
  fs.mkdir(`${app_config.name}/api`, (err) => {
    print_error(err);
    fs.mkdir(`${app_config.name}/api/routes`, print_error);
    fs.mkdir(`${app_config.name}/api/models`, print_error);
  });
};

module.exports = {
  initialize: function(config) {
    app_config = config;

    printUpdate(`\nCreating ${app_config.name} directory...`);
    fs.mkdir(`${app_config.name}`, (err) => {
      print_error(err);

      // installModules();
      // installDBClient();
      writeAppJS();
      writeServerJS();
      makeDirLayout();

      printUpdate('');
      console.log(chalk.green('Created Express app.'));
    });
  },
};
