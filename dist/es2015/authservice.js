var _dec, _class;

import { Keycloak } from './keycloak';
import { inject } from 'aurelia-framework';

export let AuthService = (_dec = inject(Keycloak), _dec(_class = class AuthService {
    constructor() {
        this.keycloak = {};
    }
    configure(aurelia, config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }

}) || _class);