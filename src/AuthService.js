import {keycloak} from './keycloak';

export class AuthService { 
    constructor(keycloak){
        let keycloak = keycloak;
    }        
    configure(config){
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }
}
