var express = require("express");
var Papa = require("papaparse");
var fs = require("fs");
var path = require('path');
var router = express.Router();

router.route('/save-to-folder').post(function(req, res) {
  var csv = Papa.unparse(req.body);
  var dir = '../output';

  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(path.resolve('../output/results_output.csv'), csv, 'utf8', function(err) {
    if (err) throw(err);
    else console.log('file is saved!');
  });
});

module.exports = router;