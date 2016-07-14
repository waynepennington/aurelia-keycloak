

import { keycloak } from './keycloak';

export var AuthService = function () {
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
}();