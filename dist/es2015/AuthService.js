import { Keycloak } from './keycloak';

export let AuthService = class AuthService {
    constructor(Keycloak) {
        let keycloak = Keycloak;
    }

    configure(config) {
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    }
};