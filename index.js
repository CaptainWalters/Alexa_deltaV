'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('kspdeltaV');
var deltaVHelper = require('./deltaVHelper');

app.launch(function(req, res) {
  var prompt = 'For information on delta V, give me a planitary name and whether you wish to orbit or land';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('deltavinfo', {
 'slots': {
    'BODYNAME': 'PLANETARYNAMES'
    'JOURNEY': 'JOURNEYTYPE'
  },
  'utterances': ['{|for} {|info} {|on} {|the} {-|BODYNAME} {-|JOURNEY}']
},
  function(req, res) {
    //get the slots
    var bodyname = req.slot('BODYNAME');
    var journey = req.slot('JOURNEY');
    var reprompt = 'Tell me a planetary name and the journey type to get delta V information.';
    if (_.isEmpty(bodyname)) {
      var prompt = 'I didn\'t hear a name. Tell me a planetary name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else if (_.isEmpty(journey)) {
      var prompt = 'I didn\'t hear a journey type. Do you wish to orbit or land?';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var vHelper = new deltaVHelper();
      try {
        var body = vHelper.getObject(bodyname)
      } catch (err) {
        var prompt = 'I don\'t have data for this body';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      }
      res.say(vHelper.infoFormat(body, journey));
      return false;
    }
  }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
return utterancesMethod().replace(/\{\-\|/g, '{');
};


module.exports = app;
