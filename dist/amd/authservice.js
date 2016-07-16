define(['exports', './keycloak', 'aurelia-framework'], function (exports, _keycloak, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var _class;

    var AuthService = exports.AuthService = (0, _aureliaFramework.noView)(_class = function () {
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
    }()) || _class;
});