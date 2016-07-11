var _dec, _class;



import { keycloak } from './keycloak';
import { LogManager } from 'aurelia-framework';
import { inject } from 'aurelia-framework';

export var AuthService = (_dec = inject(LogManager), _dec(_class = function () {
    AuthService.init = function init() {
        var keycloak = new Keycloak();
    };

    function AuthService(LogManager) {
        

        var logger = LogManager.getLogger('AuthService');
        logger.debug("GOT THIS FAR");
    }

    AuthService.prototype.configure = function configure(config) {
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);