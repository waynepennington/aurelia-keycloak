define(['exports', './keycloak', 'aurelia-framework'], function (exports, _keycloak, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var _class;

    var AuthService = exports.AuthService = (0, _aureliaFramework.noView)(_class = function () {
        function AuthService(config) {
            

            this.keycloak = null;
        }

        AuthService.prototype.configure = function configure(config) {
            var installURL;
            if (typeof config.install == 'undefined') {
                installURL = 'keycloak.json';
            } else {
                installURL = config.install;
            }
            this.keycloak = Keycloak(installURL);

            if (typeof config.initOption !== 'undefined') {
                this.keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }()) || _class;
});