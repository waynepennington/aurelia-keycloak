var _dec, _class;



import { keycloak } from './keycloak';
import { LogManager } from 'aurelia-framework';
import { inject } from 'aurelia-framework';

export var AuthService = (_dec = inject(keycloak, LogManager), _dec(_class = function () {
    function AuthService(kc, LogManager) {
        

        var logger = LogManager.getLogger('AuthService');
        logger.debug("GOT THIS FAR");
        var keycloak = kc;
    }

    AuthService.prototype.configure = function configure(config) {
        var Keycloak = kc.Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);