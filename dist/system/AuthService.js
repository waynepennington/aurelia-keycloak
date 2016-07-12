'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var AuthService;

    

    return {
        setters: [],
        execute: function () {
            _export('AuthService', AuthService = function () {
                function AuthService() {
                    

                    this.Keycloak = null;
                }

                AuthService.prototype.configure = function configure(config) {
                    this.loadKeycloakScript();
                    Keycloak = window.Keycloak;
                    console.log('INFO keycloak.js API loaded');
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