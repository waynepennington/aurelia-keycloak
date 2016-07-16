'use strict';

System.register(['./keycloak', 'aurelia-framework'], function (_export, _context) {
    "use strict";

    var Keycloak, noView, _class, AuthService;

    

    return {
        setters: [function (_keycloak) {
            Keycloak = _keycloak.Keycloak;
        }, function (_aureliaFramework) {
            noView = _aureliaFramework.noView;
        }],
        execute: function () {
            _export('AuthService', AuthService = noView(_class = function () {
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
            }()) || _class);

            _export('AuthService', AuthService);
        }
    };
});