var file = require('file-system');
var fs = require('fs');

var targetFile ="./node_modules/jquery-mapael/js/jquery.mapael.js";
//var targetFile ="./src/data/jquery.mapael11.js";
var sourceFile = "jquery.mapael.js";

file.copyFile(sourceFile, targetFile, {
  done: function(err) {
    console.log('copied mapael file');
  }
});

