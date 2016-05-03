'use strict';

var stackexchange = require('stackexchange')
	;
	
module.exports = function(options, callback){
	var stackApiOptions = { 
	version: 2.2,
	site: options.site  
	};
  var stackContext = new stackexchange(stackApiOptions);
  
  if(!options.entityId){
	  throw "Need an entity id to edit"
  }
  
  var filter = {
    //key: 'YOUR_API_KEY',
    order: 'asc',
	filter: options.filter
  };
  
  if(options.apiKey){
	  filter.key = options.apiKey;
  }
  
  // Get all the questions (http://api.stackexchange.com/docs/questions) 
  stackContext.questions.questions(filter, function(err, results){
	  var markdown = results && results.items && results.items[0] 
		? results.items[0].body_markdown 
		: null;
		
	  callback(markdown, err);
  }, [options.entityId]);
};

