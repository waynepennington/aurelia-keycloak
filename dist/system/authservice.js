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
                function AuthService() {
                    
                }

                AuthService.prototype.configure = function configure(config) {
                    var keycloak = new Keycloak(config.install);
                    if (typeof config.initOptions !== 'undefined') {
                        this.keycloak.init(config.initOptions);
                    }
                };

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});