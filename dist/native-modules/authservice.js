var _class;



import { keycloak } from './keycloak';
import { noView } from 'aurelia-framework';

export var AuthService = noView(_class = function () {
    function AuthService() {
        

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class;