'use strict';
var linkReplacer = require('./index.js');
var argumentParser = require('./argumentParser.js');

function checkArgsAndBeginLinksReplacement(argv){
	var parsedArgs = argumentParser(argv);
	
	linkReplacer.executeLinkReplacement(parsedArgs);
}

checkArgsAndBeginLinksReplacement(process.argv);