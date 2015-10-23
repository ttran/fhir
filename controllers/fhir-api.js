var rp = require('request-promise');
var Q = require('q');

module.exports = function(url){
	var deferred = Q.defer();
	
	rp(url).then(function(res){
		var json = JSON.parse(res);
		deferred.resolve(json);
	})
	.catch(function(err){
		console.log(err);
	});
	return deferred.promise;
};