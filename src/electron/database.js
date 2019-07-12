const nedb = require('nedb');
const notesDB = new nedb({
  filename: `${process.env.HOME}/.person/notesdata`,
  autoload: true,
});

module.exports = {
  notesDB,
};
