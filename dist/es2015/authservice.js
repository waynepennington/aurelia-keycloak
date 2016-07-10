import { keycloak } from './keycloak';
import { noView } from 'aurelia-framework';

export let AuthService = class AuthService {

    configure(config) {
        var installURL;
        if (typeof config.install == 'undefined') {
            installURL = 'keycloak.json';
        } else {
            installURL = config.install;
        }
        let keycloak = new Keycloak(installURL);

        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }
};