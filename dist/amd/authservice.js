define(['exports', './keycloak', 'aurelia-framework'], function (exports, _keycloak, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;

    

    var AuthService = exports.AuthService = function () {
        function AuthService() {
            
        }

        AuthService.prototype.configure = function configure(config) {
            var installURL;
            if (typeof config.install == 'undefined') {
                installURL = 'keycloak.json';
            } else {
                installURL = config.install;
            }
            var keycloak = new Keycloak(installURL);

            if (typeof config.initOption !== 'undefined') {
                this.keycloak.init(config.initOptions);
            }
        };

        return AuthService;
    }();
});