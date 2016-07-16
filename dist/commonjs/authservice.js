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
        

        this.kc = {};
    }

    AuthService.prototype.configure = function configure(aurelia, config) {
        this.kc = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.kc.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class;