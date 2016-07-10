

import { keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService() {
        
    }

    AuthService.prototype.configure = function configure(config) {
        var installURL;

        var authK = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            authk.init(config.initOptions);
        }
    };

    return AuthService;
}();