import { keycloak } from './keycloak';

export let AuthService = class AuthService {
    constructor() {
        this.keycloak = {};
    }
    configure(aurelia, config) {
        let instance = aurelia.container.get(keycloak);
        this.keycloak = new instance(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }

};