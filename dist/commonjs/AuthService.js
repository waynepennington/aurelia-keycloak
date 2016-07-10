'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _dec, _class;

var _keycloak = require('./keycloak');

var _aureliaFramework = require('aurelia-framework');



var AuthService = exports.AuthService = (_dec = (0, _aureliaFramework.inject)(_keycloak.keycloak), _dec(_class = function () {
    function AuthService(kc) {
        

        var keycloak = kc.Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        var keycloak = Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);