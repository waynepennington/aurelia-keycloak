define(['exports', './aurelia-keycloak'], function (exports, _aureliaKeycloak) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaKeycloak).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaKeycloak[key];
      }
    });
  });
});