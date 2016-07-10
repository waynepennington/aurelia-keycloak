var _dec, _class;

import { keycloak } from './keycloak';
import { inject } from 'aurelia-framework';

export let AuthService = (_dec = inject(keycloak), _dec(_class = class AuthService {
    constructor(kc) {
        let keycloak = kc.Keycloak;
    }

    configure(config) {
        let keycloak = Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    }
}) || _class);