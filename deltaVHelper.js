'use strict';
var _ = require('lodash');
const planets = require('./planets.json');

function deltaVHelper() { }

deltaVHelper.prototype.getObject = function(name) {
  name = name.toLowerCase();
  if(!planets.body[name]){
    throw new Error('This is not a listed Kerbol system body');
  } else {
    return planets.body[name];
  }
}

deltaVHelper.prototype.infoFormat = function(object, journey) {
  var info;

  if (journey === 'orbit') {
    info = _.template('For a stable low orbit of ${name} you will need about ${orbit} meters per second of delta V')({
      name: object.name,
      orbit: object.deltaV.orbit
    });
  } else if (journey === 'land') {
    info = _.template('To land on ${name} you will need about ${land} meters per second of delta V')({
      name: object.name,
      land: object.deltaV.land
    });
  } else {
    info = _.template('There has been an error')
  }
  return _.template('${info}')( {
    info: info
  });
};

module.exports = deltaVHelper;
