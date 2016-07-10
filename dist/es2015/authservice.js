import { keycloak } from './keycloak';

export let AuthService = class AuthService {

    configure(config) {
        var installURL;

        let auth = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.auth.init(config.initOptions);
        }
    }
};