define(['exports', './keycloak'], function (exports, _keycloak) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var AuthService = exports.AuthService = function () {
        function AuthService() {
            
        }

        AuthService.prototype.configure = function configure(config) {
            var keycloak = new Keycloak(config.install);
            if (typeof config.initOption !== 'undefined') {
                keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }();
});