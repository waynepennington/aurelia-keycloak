import { Keycloak } from 'http://localhost:9000/src/keycloak';

export let AuthService = class AuthService {

    configure(config) {
        let keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }

};