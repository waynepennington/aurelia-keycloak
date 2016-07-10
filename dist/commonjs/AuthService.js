'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _keycloak = require('./keycloak');



var AuthService = exports.AuthService = function () {
    function AuthService(Keycloak) {
        

        this.keycloak = Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        this.keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();