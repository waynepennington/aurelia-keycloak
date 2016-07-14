define(['exports', './keycloak', 'aurelia-framework'], function (exports, _keycloak, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var _dec, _class;

    var AuthService = exports.AuthService = (_dec = (0, _aureliaFramework.inject)(_keycloak.Keycloak), _dec(_class = function () {
        function AuthService() {
            

            this.keycloak = {};
        }

        AuthService.prototype.configure = function configure(aurelia, config) {
            this.keycloak = new _keycloak.Keycloak(config.install);
            if (typeof config.initOptions !== 'undefined') {
                this.keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }()) || _class);
});