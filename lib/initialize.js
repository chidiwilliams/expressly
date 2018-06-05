var shell = require('shelljs');

module.exports = {
  initialize: function(name, database, client) {
    console.log(name, database, client);
    shell.exec(`mkdir ${name} && cd ${name} && npm init -y &&`);
  },
};
