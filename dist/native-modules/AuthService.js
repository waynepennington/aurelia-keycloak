

import { Keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService(Keycloak) {
        

        this.keycloak = Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        this.keycloak.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();