'use strict';

var url = require('url');
var zlib = require('zlib');
var request = require('request');

var exports = module.exports = {};

function parseResultBody(buffer, callback) {
  function Unzipped(error, body) {
    try {
      var parsedJson = JSON.parse(body.toString());

      callback(error, parsedJson);
    } catch (error) {
      callback(error);
    }
  }

  zlib.unzip(buffer, Unzipped);
}

function postMarkdown(data, options, callback) {
  data.site = options.site;

  var endpoint = url.format({
    protocol: 'https:',
    host: 'api.stackexchange.com',
    pathname: '/2.2/'
  });

  function handleResponse(error, res) {
    if (error) {
      callback(error);
    } else {
      parseResultBody(res.body, callback);
    }
  }

  request(
    {
      url: endpoint,
      encoding: null,
      method: 'POST',
      form: data
    }, handleResponse);
}

function updateMarkdown(newMarkdown, callback, options) {
  if (!options || !options.key || !options.access_token) {
    throw new Error('An access token and a key are required to update markdown.');
  }

  var id = options.id;

  postMarkdown('questions/' + id.toString() + '/upvote', options, callback);
}

exports.updateMarkdown = updateMarkdown;
