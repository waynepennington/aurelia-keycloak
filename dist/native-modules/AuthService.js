var _dec, _class;



import { Keycloak } from './keycloak';
import { inject } from 'aurelia-framework';

export var AuthService = (_dec = inject(Keycloak), _dec(_class = function () {
    function AuthService(keycloak) {
        

        this.Keycloak = keycloak;
    }

    AuthService.prototype.configure = function configure(config) {
        this.Keycloak = Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);