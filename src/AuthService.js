import {keycloak} from './keycloak';
import {LogManager} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

@inject(LogManager)
export class AuthService { 
    static init(){
        let keycloak = new Keycloak();
    }
    constructor(LogManager){
        let logger = LogManager.getLogger('AuthService');
        logger.debug("GOT THIS FAR");
    }        
    configure(config){
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }
}
