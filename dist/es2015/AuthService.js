var _dec, _class;

import { Keycloak } from './keycloak';
import { inject } from 'aurelia-framework';

export let AuthService = (_dec = inject(Keycloak), _dec(_class = class AuthService {
    constructor(keycloak) {
        this.Keycloak = keycloak;
    }
    configure(config) {
        this.Keycloak = Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
}) || _class);