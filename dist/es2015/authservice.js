import { keycloak } from './keycloak';

export let AuthService = class AuthService {

    configure(config) {
        var installURL;

        let authK = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            authk.init(config.initOptions);
        }
    }
};