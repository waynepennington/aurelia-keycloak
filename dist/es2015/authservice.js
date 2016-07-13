import { Keycloak } from '../src/keycloak';

export let AuthService = class AuthService {

    configure(config) {
        let keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }

};