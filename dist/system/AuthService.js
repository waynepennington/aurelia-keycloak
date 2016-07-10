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
                    

                    var keycloak = Keycloak;
                }

                AuthService.prototype.configure = function configure(config) {
                    instance(config.install);
                    if (typeof config.initOption !== 'undefined') {
                        keycloak.init(config.initOptions);
                    }
                };

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});