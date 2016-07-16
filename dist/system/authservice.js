'use strict';

System.register(['./keycloak', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var keycloak, noView, _class, AuthService;

    

    return {
        setters: [function (_keycloak) {
            keycloak = _keycloak.keycloak;
        }, function (_aureliaFramework) {
            noView = _aureliaFramework.noView;
        }],
        execute: function () {
            _export('AuthService', AuthService = noView(_class = function () {
                function AuthService() {
                    

                    this.keycloak = {};
                }

                AuthService.prototype.configure = function configure(config) {
                    this.keycloak = new Keycloak(config.install);
                    if (typeof config.initOptions !== 'undefined') {
                        this.keycloak.init(config.initOptions);
                    }
                };

                return AuthService;
            }()) || _class);

            _export('AuthService', AuthService);
        }
    };
});