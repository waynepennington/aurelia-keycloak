'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Keycloak = exports.AuthService = undefined;
exports.configure = configure;

var _authservice = require('./authservice');

var _keycloak = require('/keycloak');

function configure(aurelia, config) {
    var instance = aurelia.container.get(_authservice.AuthService);
    instance.configure(aurelia, config);
}
exports.AuthService = _authservice.AuthService;
exports.Keycloak = _keycloak.Keycloak;