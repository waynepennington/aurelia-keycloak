define(['exports', './keycloak', 'aurelia-framework'], function (exports, _keycloak, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var _dec, _class;

    var AuthService = exports.AuthService = (_dec = (0, _aureliaFramework.inject)(_keycloak.Keycloak), _dec(_class = function () {
        function AuthService(keycloak) {
            

            this.Keycloak = keycloak;
        }

        AuthService.prototype.configure = function configure(config) {
            this.Keycloak = (0, _keycloak.Keycloak)(config.install);
            if (typeof config.initOption !== 'undefined') {
                this.Keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }()) || _class);
});