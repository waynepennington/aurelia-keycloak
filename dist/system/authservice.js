'use strict';

System.register(['./keycloak'], function (_export, _context) {
    "use strict";

    var keycloak, AuthService;

    

    return {
        setters: [function (_keycloak) {
            keycloak = _keycloak.keycloak;
        }],
        execute: function () {
            _export('AuthService', AuthService = function () {
                function AuthService() {
                    

                    this.keycloak;
                }

                AuthService.prototype.configure = function configure(config) {
                    this.Keycloak = new Keycloak(config.install);
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