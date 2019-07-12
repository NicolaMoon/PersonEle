const { ipcMain } = require('electron');
const { notesDB } = require('./database.js');

module.exports = () => {
  ipcMain.on('get-notes-list', (event, arg) => {
    notesDB.find({ title: 'note1' }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        event.sender.send('get-notes-list-reply', docs);
      }
    });
  })
};
