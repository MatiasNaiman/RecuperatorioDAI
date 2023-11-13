"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrencyAbbreviationFromName = exports.getCurrencyList = exports.getCurrencyAbbreviation = exports.getCurrency = void 0;

var _currencyMap = _interopRequireDefault(require("./currencyMap"));

var _getCountry = require("./getCountry");

var _lodash = _interopRequireDefault(require("lodash.findkey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getCurrency = function getCurrency(currencyAbbr) {
  return _currencyMap["default"][currencyAbbr];
};

exports.getCurrency = getCurrency;

var getCurrencyAbbreviation = function getCurrencyAbbreviation(countryName) {
  var country = (0, _getCountry.getCountry)(countryName);

  if (country) {
    return country.currency;
  }

  return undefined;
}; // Returns a list of currency objects.


exports.getCurrencyAbbreviation = getCurrencyAbbreviation;

var getCurrencyList = function getCurrencyList() {
  var currencyArray = Object.keys(_currencyMap["default"]).map(function (currencyAbbr) {
    return {
      abbr: currencyAbbr,
      name: _currencyMap["default"][currencyAbbr].name,
      symbolFormat: _currencyMap["default"][currencyAbbr].symbolFormat
    };
  });
  return currencyArray;
};

exports.getCurrencyList = getCurrencyList;

var getCurrencyAbbreviationFromName = function getCurrencyAbbreviationFromName(currencyName) {
  var abbr = (0, _lodash["default"])(_currencyMap["default"], function (c) {
    return c.name === currencyName;
  });
  return abbr;
};

exports.getCurrencyAbbreviationFromName = getCurrencyAbbreviationFromName;