'use strict';

System.register(['./keycloak', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var Keycloak, inject, _dec, _class, AuthService;

    

    return {
        setters: [function (_keycloak) {
            Keycloak = _keycloak.Keycloak;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            _export('AuthService', AuthService = (_dec = inject(Keycloak), _dec(_class = function () {
                function AuthService() {
                    

                    this.keycloak = {};
                }

                AuthService.prototype.configure = function configure(aurelia, config) {
                    this.keycloak = new Keycloak(config.install);
                    if (typeof config.initOptions !== 'undefined') {
                        this.keycloak.init(config.initOptions);
                    }
                };

                return AuthService;
            }()) || _class));

            _export('AuthService', AuthService);
        }
    };
});