define(['exports', '../src/keycloak'], function (exports, _keycloak) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var AuthService = exports.AuthService = function () {
        function AuthService() {
            
        }

        AuthService.prototype.configure = function configure(config) {
            var keycloak = new _keycloak.Keycloak(config.install);
            if (typeof config.initOptions !== 'undefined') {
                this.keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }();
});