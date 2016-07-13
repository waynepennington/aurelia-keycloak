

import { keycloak } from './keycloak';
export var AuthService = function () {
    function AuthService() {
        

        this.keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        this.Keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    AuthService.prototype.importKeycloak = function importKeycloak() {};

    return AuthService;
}();