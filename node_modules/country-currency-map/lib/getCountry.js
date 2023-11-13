"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountryByAbbreviation = exports.getCountry = void 0;

var _countryMap = _interopRequireDefault(require("./countryMap"));

var _lodash = _interopRequireDefault(require("lodash.findkey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getCountry = function getCountry(countryName) {
  return _countryMap["default"][countryName];
};

exports.getCountry = getCountry;

var getCountryByAbbreviation = function getCountryByAbbreviation(countryAbbr) {
  var country = (0, _lodash["default"])(_countryMap["default"], {
    abbreviation: countryAbbr
  });
  return country;
};

exports.getCountryByAbbreviation = getCountryByAbbreviation;