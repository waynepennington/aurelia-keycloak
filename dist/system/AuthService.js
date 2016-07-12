'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, AuthService;

    

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            _export('AuthService', AuthService = function () {
                function AuthService() {
                    

                    this.Keycloak = null;
                }

                AuthService.prototype.configure = function configure(config) {
                    this.loadKeycloakScript();

                    console.log('INFO window.Keycloak type of ' + _typeof(Window.Keycloak));
                    this.Keycloak = new window.Keycloak(config.install);
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
                        script.src = './jspm_packages/github/waynepennington/aurelia-keycloak@master/keycloak.js';
                        document.body.appendChild(script);
                    }
                };

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});