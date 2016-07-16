var _class;

import { keycloak } from './keycloak';
import { noView } from 'aurelia-framework';

export let AuthService = noView(_class = class AuthService {
    constructor() {
        this.keycloak = {};
    }
    configure(config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }

}) || _class;