# fhir-node

This node npm package allows for the propagation of FHIR requests to GT's FHIR database.

The module requires a parameter/options object that has 4 parameters:
  1. pages
  2. start
  3. end
  4. format

The module also has an optional callback function. If this parameter is left empty, it returns a promise.

For information on promises see: https://www.npmjs.com/package/promise

##Examples

###To install:
npm install fhir-node

###To require:
var fhir = require('fhir-node');

####options
	var params = {
		pages: 'a8b12fa1-fc96-40e6-9159-8a51b3185dc7',
		start: 41,
		end: 138,
		format: 'json'
	};
	
####promise
	fhir(params).then(function(records){
		console.log(records);
	});
	
####callback
	fhir(params, function(records){
		console.log(records);
	});
