'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
const planets = require('../planets.json');
var deltaVHelper = require('../deltaVHelper');
chai.config.includeStack = true;


describe('deltaVHelper', function() {
  var subject = new deltaVHelper();
  var bodyname;
  describe('getObject function', function() {
    context('with an invalid object name', function() {
      it('throws an error', function() {
        bodyname = 'SHITTINGHELL';
        expect(function () { subject.getObject(bodyname); }).to.throw(Error);
      });
    });
    context('with an invalid object name', function() {
      it('gives correct error message', function() {
        bodyname = 'SHITTINGHELL';
        try {
          subject.getObject(bodyname);
        } catch (err) {
          expect(err.message).to.equal('This is not a listed Kerbol system body');
        }
      });
    });
    context('with a valid *uppercase* object name', function() {
      it('returns matching object name', function() {
        bodyname = 'KERBIN';
        var body = subject.getObject(bodyname);
        return expect(body.name.toLowerCase()).to.equal(bodyname.toLowerCase());
      });
    });
    context('with a valid *lowercase* object name', function() {
      it('returns matching object name', function() {
        bodyname = 'mun';
        var body = subject.getObject(bodyname);
        return expect(body.name.toLowerCase()).to.equal(bodyname.toLowerCase());
      });
    });
  });
  describe('JSON interaction', function() {
    context('with an invalid object name', function() {
      it('returns as undefined', function() {
        bodyname = 'SHITTINGHELL';
        return expect(planets.body[bodyname]).to.be.undefined;
      });
    });
    context('with a valid object name', function() {
      it('returns matching object name', function() {
        bodyname = 'Mun';
        return expect(planets.body[bodyname.toLowerCase()].name).to.equal(bodyname);
      });
    });
  });
  /*describe('planetsFormat function', function() {
    var pluto = {
      "name": "Mona",
      "deltaV":{
        "orbit": 12400,
        "land": 32000
      };
    context('using Pluto as a planet', function() {
      it('formats to state hop', function() {
        pluto.type = 'planet';
        return expect(subject.planetsFormat(pluto)).to.eq('Pluto is the ninth planet from the Sun. It is approximately 1187 kilometers in diameter, and appears light brown when viewed from space.');
      });
    });
    context('using Pluto as a satellite', function() {
      it('formats to state hop', function() {
        pluto.type = 'satellite';
        return expect(subject.planetsFormat(pluto)).to.eq('Pluto is the only moon of Sun. It is approximately 1187 kilometers in diameter, and appears light brown when viewed from space.');
      });
    });
    context('get and use "Moon" object', function() {
      it('returns matching string', function() {
        var body = subject.getObject('Moon');
        return expect(subject.planetsFormat(body)).to.eq('Moon is the only moon of Earth. It is approximately 3474 kilometers in diameter, and appears grey when viewed from space.');
      });
    });
  });*/
});
