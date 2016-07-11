var _dec, _class;



import { keycloak } from './keycloak';
import { LogManager } from 'aurelia-framework';
import { inject } from 'aurelia-framework';

export var AuthService = (_dec = inject(keycloak, LogManager), _dec(_class = function () {
    function AuthService(kc, LogManager) {
        

        var logger = LogManager.getLogger('AuthService');
        console.log("GOT THIS FAR");
        var keycloak = new kc.Keycloak();
    }

    AuthService.prototype.configure = function configure(config) {
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);