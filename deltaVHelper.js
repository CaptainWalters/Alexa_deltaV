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

deltaVHelper.prototype.infoFormat = function(object) {
  //var info;

  /*if(object.type === 'moon') {
    info = _.template('only moon of ${orbits}.')({
      orbits: object.orbits
    });
  } else {
    info = _.template('${hop} planet from the Sun.')({
      hop: object.hop
    });
  }*/

  return _.template('For a stable low orbit of ${name} you will need about ${orbit} meters per second and to land you will need about ${land} meters per second of delta V')({
    name: object.name,
    orbit: object.deltaV.orbit,
    land: object.deltaV.land
  });
};

module.exports = deltaVHelper;
