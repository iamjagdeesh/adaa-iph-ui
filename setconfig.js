var fs = require('fs');

var argsD = [];
var i =0;
var arrayOfObjects = [];
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  argsD[i]=val;
  i++;
});
 
var apiUrlFromEnv = process.env.APIURL;
 arrayOfObjects.push({
	    apiUrl: apiUrlFromEnv
	    
	  }); 

fs.writeFile('./configs.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
    if (err) throw err;
    console.log('Environment Updated!');
  });
