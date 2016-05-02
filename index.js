'use strict';
var stackexchange = require('stackexchange')
  , request = require('request')
  , cheerio = require('cheerio');
  
var exports = module.exports = {};
 
function replaceLinksInMarkDown(markdown){

  var searchTerm = 'screen+scraping';
  var url = 'http://www.bing.com/search?q=' + searchTerm;

  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('title').text(); //use your CSS selector here
    $(links).each(function(i, link){
      console.log($(link).text() + ':\n  ' + $(link).attr('href'));
    });
  });
}

function retrieveMarkdown(options){
  var stackApiOptions = { version: 2.2,
site: "scifi.stackexchange.com"  };
  var context = new stackexchange(stackApiOptions);
  
  if(!options.entityId){
	  throw "Need an entity id to edit"
  }
  
  var filter = {
    //key: 'YOUR_API_KEY',
    order: 'asc',
	filter: options.filter
  };
  // Get all the questions (http://api.stackexchange.com/docs/questions) 
  context.questions.questions(filter, function(err, results){
    if (err) throw err;
    
	console.log("Results: ");
    console.log(results);
  }, [options.entityId]);
}

function executeLinkReplacement(options){
	retrieveMarkdown(options);
}

exports.checkArgsAndBeginLinksReplacement = function(argv){

function readArguments(argv){
  var entityId = 27687;
  var isForAnswer = false;
  var site = "http://scifi.stackexchange.com";
  // print process.argv
  argv.forEach(function (val, index, array) {
	if(index < 2){
		return true;
	}
	
    console.log(index + ': ' + val);
	
    if(index == (array.length - 1)){
      entityId = val;
    }
    
    if(val === "-a"){
      isForAnswer = true;
    }
    
    if(val === "-q"){
      isForAnswer = false;
    }
    
    if(val === "-s"){
      site = array[index + 1];
    }
  });
  
  return {
    entityId: entityId,
    isForAnswer: isForAnswer,
    site: site,
	filter: "!L_(I6pMIzdXP-hC1clc9EY"
  }
}

	var argCount = argv.length;

	if(argCount < 3) {
		console.log("A target question or answer id was not supplied.");
		return;
	}
	  
	var parsedArgs = readArguments(argv);
	
	executeLinkReplacement(parsedArgs);
}