define(['exports', './keycloak', 'aurelia-framework'], function (exports, _keycloak, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var _dec, _class;

    var AuthService = exports.AuthService = (_dec = (0, _aureliaFramework.inject)(_keycloak.keycloak, _aureliaFramework.LogManager), _dec(_class = function () {
        function AuthService(kc, LogManager) {
            

            var logger = LogManager.getLogger('AuthService');
            logger.debug("GOT THIS FAR");
            var keycloak = kc;
        }

        AuthService.prototype.configure = function configure(config) {
            var Keycloak = kc.Keycloak(config.install);
            if (typeof config.initOption !== 'undefined') {
                this.Keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }()) || _class);
});