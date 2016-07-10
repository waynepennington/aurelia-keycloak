'use strict';

System.register(['./keycloak'], function (_export, _context) {
    "use strict";

    var Keycloak, AuthService;

    

    return {
        setters: [function (_keycloak) {
            Keycloak = _keycloak.Keycloak;
        }],
        execute: function () {
            _export('AuthService', AuthService = function () {
                function AuthService(Keycloak) {
                    

                    this.keycloak = Keycloak;
                }

                AuthService.prototype.configure = function configure(config) {
                    this.keycloak.loadConfig(config.install);
                    if (typeof config.initOption !== 'undefined') {
                        this.keycloak.init(config.initOptions);
                    }
                };

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});