import { keycloak } from './keycloak';

export let AuthService = class AuthService {
    configure(config) {
        let keycloak = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    }
};