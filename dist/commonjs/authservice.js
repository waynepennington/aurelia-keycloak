'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _keycloak = require('./keycloak');

var _aureliaFramework = require('aurelia-framework');



var AuthService = exports.AuthService = function () {
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
        this.keycloak = (0, _keycloak.Keycloak)(installURL);

        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();