'use strict';
var linkReplacer = require('markdown-plain-link-replacer');
var markdownEditor = require('./lib/stack-markdown-editor.js');

var exports = module.exports = {};


exports.executeLinkReplacement = function (options) {
  var markdownCallback = function (markdown, err) {
    if (err) {
      throw err;
    }

    if (!markdown) {
      var errorMessage = 'There was no markdown found to replace links on.';
      console.log(errorMessage);
      throw new Error(errorMessage);
    }

    linkReplacer.replacePlainLinks(markdown, function (newMarkdown) {
      markdownEditor.updateMarkdown(newMarkdown, options);
    });
  };

  markdownEditor.retrieveMarkdown(options, markdownCallback);
};
