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
                    
                }

                AuthService.prototype.configure = function configure(config) {
                    var keycloak = new Keycloak(config.install);
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