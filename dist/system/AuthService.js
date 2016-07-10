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

                AuthService.init = function init() {
                    this.Auth = new Keycloak();
                };

                AuthService.prototype.configure = function configure(config) {
                    this.Auth.loadConfig(config.install);
                    if (typeof config.initOption !== 'undefined') {
                        this.Auth.init(config.initOptions);
                    }
                };

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});