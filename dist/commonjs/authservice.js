'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _class;

var _keycloak = require('./keycloak');

var _aureliaFramework = require('aurelia-framework');



var AuthService = exports.AuthService = (0, _aureliaFramework.noView)(_class = function () {
    function AuthService() {
        

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(config) {
        this.keycloak = new _keycloak.Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class;