# fhir-node

This node npm package allows for the propagation of FHIR requests to GT's FHIR database.

The module requires a parameter/options object that has 4 parameters:
  1. start
  2. end
  3. format

The module also has an optional callback function. If this parameter is left empty, it returns a promise.

For information on promises see: https://www.npmjs.com/package/promise

##Examples

###To install:
npm install fhir-node

###To require:
var fhir = require('fhir-node');

####options
	var params = {
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

Currently only returns "entry" records (does not return metadata regarding the request).
Also currently reads from read-only server.
