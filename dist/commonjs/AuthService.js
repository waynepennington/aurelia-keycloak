'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _dec, _class;

var _keycloak = require('./keycloak');

var _aureliaFramework = require('aurelia-framework');



var AuthService = exports.AuthService = (_dec = (0, _aureliaFramework.inject)(_keycloak.keycloak, _aureliaFramework.LogManager), _dec(_class = function () {
    function AuthService(kc, LogManager) {
        

        var logger = LogManager.getLogger('AuthService');
        console.log("GOT THIS FAR");
        var keycloak = new kc.Keycloak();
    }

    AuthService.prototype.configure = function configure(config) {
        (0, _keycloak.keycloak)(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);