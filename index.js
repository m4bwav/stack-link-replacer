'use strict';
var markdownRetriever = require('./markdown-retriever.js')
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

exports.executeLinkReplacement = function(options){
	var markdownCallback = function(markdown, err){
		if(err){
			throw err;
		}
    
	console.log("Results: ");
    console.log(markdown);
  };
	
	markdownRetriever(options, markdownCallback);
};
