var _class;

import { keycloak } from './keycloak';
import { noView } from 'aurelia-framework';

export let AuthService = noView(_class = class AuthService {
    constructor(config) {
        this.keycloak = null;
    }
    configure(config) {
        var installURL;
        if (typeof config.install == 'undefined') {
            installURL = 'keycloak.json';
        } else {
            installURL = config.install;
        }
        this.keycloak = Keycloak(installURL);

        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }
}) || _class;