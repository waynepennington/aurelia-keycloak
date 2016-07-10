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
            var installURL;

            var auth = new Keycloak(config.install);
            if (typeof config.initOption !== 'undefined') {
                this.auth.init(config.initOptions);
            }
        };

        return AuthService;
    }();
});