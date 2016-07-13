'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _keycloak = require('.keycloak');



var AuthService = exports.AuthService = function () {
    function AuthService() {
        

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.defer = false;
        script.src = './src/keycloak.js';
        document.body.appendChild(script);

        var Keycloak = window.Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        this.Keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    AuthService.prototype.importKeycloak = function importKeycloak() {};

    return AuthService;
}();