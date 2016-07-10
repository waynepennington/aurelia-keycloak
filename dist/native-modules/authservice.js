

import { keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService() {
        
    }

    AuthService.prototype.configure = function configure(config) {
        var installURL;

        var auth = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.auth.init(config.initOptions);
        }
    };

    return AuthService;
}();