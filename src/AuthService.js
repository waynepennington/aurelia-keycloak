import {Keycloak} from './keycloak';

export class AuthService {
    constructor(Keycloak){
        this.keycloak = Keycloak;
    }
         
    configure(config){
        keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    }
}
