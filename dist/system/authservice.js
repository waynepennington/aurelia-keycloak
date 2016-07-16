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
                    

                    this.kc = {};
                }

                AuthService.prototype.configure = function configure(aurelia, config) {
                    var Keycloak = keycloak();
                    this.kc = new Keycloak(config.install);
                    if (typeof config.initOptions !== 'undefined') {
                        this.kc.init(config.initOptions);
                    }
                };

                return AuthService;
            }()) || _class);

            _export('AuthService', AuthService);
        }
    };
});