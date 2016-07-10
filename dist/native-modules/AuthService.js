

import { keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService() {
        
    }

    AuthService.init = function init() {
        this.Auth = new Keycloak();
    };

    AuthService.prototype.configure = function configure(config) {
        this.Auth.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Auth.init(config.initOptions);
        }
    };

    return AuthService;
}();