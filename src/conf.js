import configs from '../configs';

/*
var apiUrl;
if(args == 'production'){
	 console.log("in prod");
	 apiUrl="https://iph-service.cfapps.io/iph/";
}
else {
	console.log("in dev");
	 apiUrl="https://iph-service-local.cfapps.io/iph/";
}
const myConfig = {  "apiUrl": apiUrl};
console.log(myConfig);*/

const myConfig = {"apiUrl":configs[0].apiUrl}
//console.log(myConfig);

module.exports = myConfig;