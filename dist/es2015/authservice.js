import { keycloak } from './keycloak';

export let AuthService = class AuthService {
    constructor() {
        this.keycloak = {};
    }
    configure(config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }

};