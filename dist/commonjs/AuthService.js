'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _keycloak = require('./keycloak');



var AuthService = exports.AuthService = function () {
    function AuthService() {
        
    }

    AuthService.init = function init() {
        this.Auth = new Keycloak();
    };

    AuthService.prototype.configure = function configure(config) {
        this.Auth.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Auth.init(config.initOptions);
        }
    };

    return AuthService;
}();