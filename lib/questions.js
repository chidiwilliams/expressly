module.exports = {
  dbs: [
    {
      type: 'list',
      name: 'db',
      message: 'Select the type of database:',
      choices: ['MongoDB'],
      default: ['MongoDB'],
    },
  ],
  db_clients: {
    MongoDB: [
      {
        type: 'list',
        name: 'db_client',
        message: 'Choose a MongoDB client:',
        choices: ['Mongoose'],
        default: ['Mongoose'],
      },
    ],
  },
};
