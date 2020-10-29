
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

module.exports = function upload(req, res) {
  const form = new IncomingForm();

  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // can access it using file.path
    console.log('file', file.name, "Dowloaded successfully");
    const readfile = fs.readFileSync(file.path);
    const path = require('path');
    var dir = '../data/files/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.copyFile(file.path, dir + file.name, () => { });
    fs.unlinkSync(file.path);
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
};
