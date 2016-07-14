'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _keycloak = require('./keycloak');



var AuthService = exports.AuthService = function () {
    function AuthService() {
        

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(aurelia, config) {
        var instance = aurelia.container.get(_keycloak.keycloak);
        this.keycloak = new instance(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();