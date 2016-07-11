'use strict';

System.register(['./keycloak', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var keycloak, LogManager, inject, _dec, _class, AuthService;

    

    return {
        setters: [function (_keycloak) {
            keycloak = _keycloak.keycloak;
        }, function (_aureliaFramework) {
            LogManager = _aureliaFramework.LogManager;
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            _export('AuthService', AuthService = (_dec = inject(keycloak, LogManager), _dec(_class = function () {
                function AuthService(kc, LogManager) {
                    

                    var logger = LogManager.getLogger('AuthService');
                    console.log("GOT THIS FAR");
                    var keycloak = new kc.Keycloak();
                }

                AuthService.prototype.configure = function configure(config) {
                    keycloak(config.install);
                    if (typeof config.initOption !== 'undefined') {
                        this.keycloak.init(config.initOptions);
                    }
                };

                return AuthService;
            }()) || _class));

            _export('AuthService', AuthService);
        }
    };
});