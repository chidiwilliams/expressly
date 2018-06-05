#!/usr/bin/env node
const clear = require('clear');
const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const { prompt } = require('inquirer');
const files = require('./lib/files');
const { print, initialize } = require('./lib/initialize');

program
  .version('0.0.1')
  .description(
    'A command-line tool for seamlessly bootstrapping ExpressJS apps',
  );

const questions1 = [
  {
    type: 'list',
    name: 'db',
    message: 'Select the type of database:',
    choices: ['MongoDB'],
    default: ['MongoDB'],
  },
];

const db_clients = {
  MongoDB: [
    {
      type: 'list',
      name: 'db_client',
      message: 'Choose a MongoDB client:',
      choices: ['Mongoose'],
      default: ['Mongoose'],
    },
  ],
};

program
  .command('init <name>')
  .description('Initialize ExpressJS application')
  .action((name) => {
    clear();
    console.log(
      chalk.yellow(figlet.textSync('Expressly', { horizontalLayout: 'full' })),
    );

    let database = '',
      client = '';

    prompt(questions1)
      .then((user_db) => {
        database = user_db.db;
        return prompt(db_clients[database]);
      })
      .then((user_client) => {
        client = user_client.db_client
        initialize(name, database, client);
      })
      .catch();
  });

program.parse(process.argv);
