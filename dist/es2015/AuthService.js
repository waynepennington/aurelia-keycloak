import { Keycloak } from './keycloak';

export let AuthService = class AuthService {
    constructor() {
        this.Keycloak = Keycloak;
    }

    configure(config) {
        this.Keycloak.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
};