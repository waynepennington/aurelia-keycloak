var _dec, _class;



import { Keycloak } from './keycloak';
import { inject } from 'aurelia-framework';

export var AuthService = (_dec = inject(Keycloak), _dec(_class = function () {
    function AuthService() {
        

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(aurelia, config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class);