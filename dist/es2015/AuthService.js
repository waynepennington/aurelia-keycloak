var _dec, _class;

import { keycloak } from './keycloak';
import { LogManager } from 'aurelia-framework';
import { inject } from 'aurelia-framework';

export let AuthService = (_dec = inject(keycloak, LogManager), _dec(_class = class AuthService {
    constructor(kc, LogManager) {
        let logger = LogManager.getLogger('AuthService');
        logger.debug("GOT THIS FAR");
        let keycloak = kc;
    }
    configure(config) {
        let Keycloak = kc.Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
}) || _class);