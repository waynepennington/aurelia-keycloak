import {Keycloak} from './keycloak';

export class AuthService {
    constructor(Keycloak){
        this.keycloak = Keycloak;
    }
         
    configure(config){
        this.keycloak.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    }
}
