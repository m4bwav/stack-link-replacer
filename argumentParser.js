'use strict';
var minimist = require('minimist')
  ;
  
module.exports = function(argv){
	var argCount = argv.length;
	var site = "scifi.stackexchange.com";

	if(argCount < 3) {
		console.log("A target question or answer id was not supplied.");
		return;
	}
	
	var parsedArgArray = minimist(argv);
  
  return {
    entityId: argv[argCount - 1] || entityId,
    isForAnswer: parsedArgArray.a === true && !parsedArgArray.q,
    site: parsedArgArray.s || site,
	filter: "!L_(I6pMIzdXP-hC1clc9EY"
  };
};
 