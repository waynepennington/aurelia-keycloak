var _class;

import { keycloak } from './keycloak';
import { noView } from 'aurelia-framework';

export let AuthService = noView(_class = class AuthService {
    constructor() {
        this.kc = {};
    }
    configure(aurelia, config) {
        this.kc = new keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.kc.init(config.initOptions);
        }
    }

}) || _class;