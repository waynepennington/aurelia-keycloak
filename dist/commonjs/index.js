'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaKeycloak = require('./aurelia-keycloak');

Object.keys(_aureliaKeycloak).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaKeycloak[key];
    }
  });
});