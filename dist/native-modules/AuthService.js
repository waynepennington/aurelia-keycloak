

import { Keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService() {
        

        this.Keycloak = Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        this.Keycloak.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();