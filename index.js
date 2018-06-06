#!/usr/bin/env node
const clear = require('clear');
const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const { prompt } = require('inquirer');
const { initialize } = require('./lib/initialize');
const { dbs, db_clients } = require('./lib/questions');

let config = {
  name: '',
  db: '',
  db_client: '',
};

program
  .version('0.0.1')
  .description(
    'A command-line tool for seamlessly bootstrapping ExpressJS apps',
  );

program
  .command('init <app_name>')
  .description('Initialize ExpressJS application')
  .action((app_name) => {
    clear();
    console.log(
      chalk.yellow(figlet.textSync('Expressly', { horizontalLayout: 'full' })),
    );

    config.name = app_name;

    prompt(dbs)
      .then((user_db) => {
        config.db = user_db.db;
        return prompt(db_clients[config.db]);
      })
      .then((user_client) => {
        config.db_client = user_client.db_client;
        initialize(config);
      })
      .catch((err) => {
        console.log(err);
      });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
