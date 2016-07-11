var _dec, _class;

import { keycloak } from './keycloak';
import { LogManager } from 'aurelia-framework';
import { inject } from 'aurelia-framework';

export let AuthService = (_dec = inject(LogManager), _dec(_class = class AuthService {
    static init() {
        let keycloak = new Keycloak();
    }
    constructor(LogManager) {
        let logger = LogManager.getLogger('AuthService');
        logger.debug("GOT THIS FAR");
    }
    configure(config) {
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }
}) || _class);