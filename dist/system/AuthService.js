'use strict';

System.register(['./keycloak', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var keycloak, inject, _dec, _class, AuthService;

    

    return {
        setters: [function (_keycloak) {
            keycloak = _keycloak.keycloak;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            _export('AuthService', AuthService = (_dec = inject(keycloak), _dec(_class = function () {
                function AuthService(kc) {
                    

                    var keycloak = kc.Keycloak;
                }

                AuthService.prototype.configure = function configure(config) {
                    var keycloak = Keycloak(config.install);
                    if (typeof config.initOption !== 'undefined') {
                        keycloak.init(config.initOptions);
                    }
                };

                return AuthService;
            }()) || _class));

            _export('AuthService', AuthService);
        }
    };
});