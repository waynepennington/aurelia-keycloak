var _class;

import { keycloak } from './keycloak';
import { noView } from 'aurelia-framework';

export let AuthService = noView(_class = class AuthService {
    constructor() {
        this.kc = {};
    }
    configure(aurelia, config) {
        let Keycloak = keycloak();
        this.kc = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.kc.init(config.initOptions);
        }
    }

}) || _class;