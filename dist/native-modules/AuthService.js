

import { Keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService(Keycloak) {
        

        var keycloak = Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        instance(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();