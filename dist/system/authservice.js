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
                    

                    this.keycloak = {};
                }

                AuthService.prototype.configure = function configure(aurelia, config) {
                    var instance = aurelia.container.get(Keycloak);
                    this.keycloak = new instance(config.install);
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