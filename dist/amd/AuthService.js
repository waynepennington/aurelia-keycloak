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
            this.Keycloak = (0, _keycloak.Keycloak)(config.install);
            if (typeof config.initOption !== 'undefined') {
                this.Keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }();
});