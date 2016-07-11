import {keycloak} from './keycloak';
import {LogManager} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

@inject(keycloak, LogManager)
export class AuthService { 
    constructor(kc,LogManager){
        let logger = LogManager.getLogger('AuthService');
        logger.debug("GOT THIS FAR");
        let keycloak = kc;
    }        
    configure(config){
        let Keycloak = kc.Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
}
