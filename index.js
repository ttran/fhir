var fhir = require('./controllers/fhir-api');
var rp = require('request-promise');
var Q = require('q');

module.exports = function(options, callback){
	var defer = Q.defer();
	rp('http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp-ro/base/Patient?_format=json&_pretty=true&_count=0').then(function(res){
		var data = JSON.parse(res);
		var key = data.link[1].url;
		key = key.split('_getpages=')[1];
		key = key.split('&_getpagesoffset=')[0];
		var start = 0;
		var end = data.total;
		var format = 'json';
			if (options!=null){
				start = options.start;
				end = options.end;
				format = options.format;
			}
		
		var url;
		var calls = [];
		var deferred = Q.defer();
		for (var offset=start;offset<end;offset+=50){
			var count = 50;
			if (offset+50>end){
				count = end-offset;
			}
			url = 'http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp-ro/base?_getpages='+key+
			'&_getpagesoffset='+offset+
			'&_count='+count+
			'&_format='+format+
			'&_pretty=true';
			calls.push(fhir(url));
		}
		
		var api = Q.all(calls);
		
		api.then(function(info){
			var patients = [];
			for (var i=0;i<info.length;i++){
				for (var e=0;e<info[i].entry.length;e++){
					patients.push(info[i].entry[e]);
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
			defer.resolve(deferred.promise);
		}
	});
	return defer.promise;
};