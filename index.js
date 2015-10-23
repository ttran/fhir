var fhir = require('./controllers/fhir-api');
var Q = require('q');

module.exports = function(params, callback){
	var pages = params.pages;
	var start = params.start;
	var end = params.end;
	var format = params.format;
	var url ='';
	
	var calls = [];
	var deferred = Q.defer();
	for (var offset=start;offset<end;offset+=50){
		var count = 50;
		if (offset+50>end){
			count = end-offset;
		}
		url = 'http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp/base?_getpages='+pages+
		'&_getpagesoffset='+offset+
		'&_count='+count+
		'&_format='+format+
		'&_pretty=true';
		calls.push(url);
	}
	
	var api = Q.all(calls);
	
	api.then(function(data){
		var patients = [];
		for (var i=0;i<data.length;i++){
			for (var e=0;e<data[i].entry.length;e++){
				patients.push(data[i].entry[e]);
			}
		}
		// runs callback if present
		if (!callback){
			deferred.resolve(patients);
		} else{
			callback(patients);
		}
	});
	// returns promise
	if (!callback){
		return deferred.promise;
	}
};