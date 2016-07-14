

import { keycloak } from './keycloak';

export var AuthService = function () {
    function AuthService() {
        

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(aurelia, config) {
        var instance = aurelia.container.get(keycloak);
        this.keycloak = new instance(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();