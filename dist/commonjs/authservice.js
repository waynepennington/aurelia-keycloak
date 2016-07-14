'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _keycloak = require('./keycloak');



var AuthService = exports.AuthService = function () {
    function AuthService() {
        

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();