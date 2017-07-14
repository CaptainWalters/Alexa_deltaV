'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('kspdeltaV');
var deltaVHelper = require('./deltaVHelper');

app.launch(function(req, res) {
  var prompt = 'For information on delta V, tell me a planitary name.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('deltavinfo', {
 'slots': {
    'BODYNAME': 'PLANETARYNAMES'
  },
  'utterances': ['{|for} {|info} {|on} {|the} {-|BODYNAME}']
},
  function(req, res) {
    //get the slot
    var bodyname = req.slot('BODYNAME');
    var reprompt = 'Tell me a planetary name to get information.';
    if (_.isEmpty(bodyname)) {
      var prompt = 'I didn\'t hear a name. Tell me a planetary name.';
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
      res.say(vHelper.infoFormat(body));
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
