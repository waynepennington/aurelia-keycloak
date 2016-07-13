define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    

    var AuthService = exports.AuthService = function () {
        function AuthService() {
            

            this.Keycloak;
            var script = document.createElement('script');

            script.type = 'text/javascript';
            script.async = false;
            script.defer = false;
            script.src = './src/keycloak.js';

            document.body.appendChild(script);
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
});