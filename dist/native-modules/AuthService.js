var _dec, _class;



import { keycloak } from './keycloak';
import { inject } from 'aurelia-framework';

export var AuthService = (_dec = inject(keycloak), _dec(_class = function () {
    function AuthService(kc) {
        

        var keycloak = kc.Keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        var keycloak = Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);