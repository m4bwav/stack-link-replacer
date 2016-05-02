'use strict';
var stackexchange = require('stackexchange')
  , request = require('request')
  , cheerio = require('cheerio')
  ;
  
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
  // Get all the questions (http://api.stackexchange.com/docs/questions) 
  stackContext.questions.questions(filter, function(err, results){
    if (err) throw err;
    
	console.log("Results: ");
    console.log(results);
  }, [options.entityId]);
}

exports.executeLinkReplacement = function(options){
	retrieveMarkdown(options);
};
