'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var AuthService;

    

    return {
        setters: [],
        execute: function () {
            _export('AuthService', AuthService = function () {
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
                    this.Keycloak = new window.Keycloak(config.install);
                    if (typeof config.initOptions !== 'undefined') {
                        this.Keycloak.init(config.initOptions);
                    }
                };

                AuthService.prototype.importKeycloak = function importKeycloak() {};

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});