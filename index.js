'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('kspdeltaV');
var deltaVHelper = require('./deltaVHelper');

app.launch(function(req, res) {
  var prompt = 'For information on delta V, tell me whether you wish to orbit or land at a specific planitary name.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('deltavinfo', {
 'slots': {
    'BODYNAME': 'PLANETARYNAMES',
    'JOURNEY': 'JOURNEYTYPE'
  },
  'utterances': ['{|to} {-|JOURNEY} {|on|around|at} {-|BODYNAME} {|how much delta V} {|would it take|do I need|would I need}', '{|how much} {|delta V} {would it take|do I need|would I need} to {-|JOURNEY} {|on|around|at} {-|BODYNAME}']
},
  function(req, res) {
    //get the slots
    var bodyname = req.slot('BODYNAME');
    var journey = req.slot('JOURNEY');
    var reprompt = 'Tell me a journey type and the planetary name to get information on the delta V.';
    if (_.isEmpty(journey)) {
    var prompt = 'I didn\'t hear a journey type. Do you wish to orbit or land?';
    res.say(prompt).reprompt(reprompt).shouldEndSession(false);
    return true;
    } else if (_.isEmpty(bodyname)) {
      var prompt = 'I didn\'t hear a name. Tell me a planetary name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var vHelper = new deltaVHelper();
      try {
        var body = vHelper.getObject(bodyname);
        res.say(vHelper.infoFormat(body, journey));
      } catch (err) {
        var prompt = 'I don\'t have data for this body';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      }
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
