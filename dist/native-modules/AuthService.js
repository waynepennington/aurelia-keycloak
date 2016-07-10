

import { Keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService(Keycloak) {
        

        this.keycloak = Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();