

import { keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService() {
        
    }

    AuthService.prototype.configure = function configure(config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();