"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatLocaleCurrency = exports.formatCurrency = void 0;

var _getCurrency = require("./getCurrency");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var numericAbbr = {
  thousand: {
    symbol: 'k',
    value: 1000
  },
  million: {
    symbol: 'm',
    value: 1000000
  },
  billion: {
    symbol: 'b',
    value: 1000000000
  },
  trillion: {
    symbol: 't',
    value: 1000000000000
  }
};
var currencySymbolMap = {
  pound: '\xA3',
  euro: "\u20AC",
  yen: '\xA5'
};

var abbreviateNumericValue = function abbreviateNumericValue(value) {
  var symbol = '';
  var abbrValue = value;

  if (value / numericAbbr.trillion.value > 1) {
    abbrValue = value / numericAbbr.trillion.value;
    symbol = numericAbbr.trillion.symbol;
  } else if (value / numericAbbr.billion.value > 1) {
    abbrValue = value / numericAbbr.billion.value;
    symbol = numericAbbr.billion.symbol;
  } else if (value / numericAbbr.million.value > 1) {
    abbrValue = value / numericAbbr.million.value;
    symbol = numericAbbr.million.symbol;
  } else if (value / numericAbbr.thousand.value > 1) {
    abbrValue = value / numericAbbr.thousand.value;
    symbol = numericAbbr.thousand.symbol;
  }

  return {
    rawValue: abbrValue,
    symbol: symbol,
    string: "".concat(abbrValue.toFixed(value >= 1000 ? 1 : 2)).concat(symbol)
  };
};

var getFixedDigitCount = function getFixedDigitCount(value, autoFixed) {
  if (value >= 1000 && autoFixed) {
    return 0;
  }

  if (value - Math.floor(value) === 0 && autoFixed) {
    return 0;
  }

  return 2;
};

var formatCurrency = function formatCurrency(value, currencyAbbr) {
  var currency = (0, _getCurrency.getCurrency)(currencyAbbr);

  if (currency) {
    return currency.symbolFormat.replace(/&(\w+);/, function (match, p1) {
      return currencySymbolMap[p1] || p1;
    }).replace('{#}', value);
  }

  return "".concat(value, " ").concat(currencyAbbr);
};

exports.formatCurrency = formatCurrency;

var formatLocaleCurrency = function formatLocaleCurrency(value, currency) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var parsedValue = parseFloat(value);

  var finalOptions = _objectSpread({
    abbreviate: false,
    autoFixed: true
  }, options);

  var abbreviate = finalOptions.abbreviate,
      autoFixed = finalOptions.autoFixed;
  var locale = finalOptions.locale;
  var digitCount = getFixedDigitCount(value, autoFixed);
  var abbrResult = abbreviate ? abbreviateNumericValue(parsedValue) : undefined;
  var localeOptionsSupported = (typeof Intl === "undefined" ? "undefined" : _typeof(Intl)) == 'object' && Intl && typeof Intl.NumberFormat == 'function';

  if (!localeOptionsSupported) {
    return formatCurrency(abbrResult ? abbrResult.string : parsedValue, currency);
  }

  if (!locale) {
    locale = typeof window !== 'undefined' && window !== null && window.navigator && window.navigator.language ? window.navigator.language : 'en-US';
  }

  if (abbrResult) {
    var format = abbrResult.rawValue.toLocaleString(locale, {
      minimumFractionDigits: digitCount,
      maximumFractionDigits: digitCount
    });
    var localeCurr = abbrResult.rawValue.toLocaleString(locale, {
      minimumFractionDigits: digitCount,
      maximumFractionDigits: digitCount,
      currency: currency,
      style: 'currency'
    });
    return localeCurr.replace(format, "".concat(format).concat(abbrResult.symbol));
  }

  return parsedValue.toLocaleString(locale, {
    minimumFractionDigits: digitCount,
    maximumFractionDigits: digitCount,
    currency: currency,
    style: 'currency'
  });
};

exports.formatLocaleCurrency = formatLocaleCurrency;