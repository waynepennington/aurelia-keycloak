import { keycloak } from './keycloak';
export let AuthService = class AuthService {

    constructor() {
        this.keycloak;
    }
    configure(config) {
        this.Keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
    importKeycloak() {}
};