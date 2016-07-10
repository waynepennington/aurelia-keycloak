import { keycloak } from './keycloak';

export let AuthService = class AuthService {
    configure(config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }
};