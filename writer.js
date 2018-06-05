var fs = require('fs');

fs.writeFile("./read.txt", "Hey there!\nHello", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
