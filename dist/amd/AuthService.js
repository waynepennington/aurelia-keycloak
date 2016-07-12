define(['exports', './keycloak'], function (exports, _keycloak) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var AuthService = exports.AuthService = function () {
        AuthService.init = function init() {
            this.Keycloak = null;
        };

        function AuthService() {
            

            this.loadKeycloakScript();
            console.log('INFO keycloak.js loaded');
        }

        AuthService.prototype.configure = function configure(config) {
            this.Keycloak = new Keycloak(config.install);
            console.log('INFO Keycloak authentication client installation configuration loaded');
            if (typeof config.initOptions !== 'undefined') {
                this.Keycloak.init(config.initOptions);
                console.log('INFO Keycloak initialization options loaded');
                console.log('INFO ' + config.initOptions);
            }
        };

        AuthService.prototype.loadKeycloakScript = function loadKeycloakScript() {
            if (window.Keycloak === undefined) {
                var script = document.createElement('script');

                script.type = 'text/javascript';
                script.async = false;
                script.defer = false;
                script.src = './keycloak.js';
                document.body.appendChild(script);
            }
        };

        return AuthService;
    }();
});