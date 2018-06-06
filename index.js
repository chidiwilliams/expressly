#!/usr/bin/env node
const clear = require('clear');
const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const { prompt } = require('inquirer');
const { print, initialize } = require('./lib/initialize');

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

    config.name = name;

    prompt(questions1)
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
