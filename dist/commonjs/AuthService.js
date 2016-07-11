'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _keycloak = require('./keycloak');



var AuthService = exports.AuthService = function () {
    function AuthService() {
        

        this.Keycloak = _keycloak.Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        this.Keycloak.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();