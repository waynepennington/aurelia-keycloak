import {Keycloak} from './keycloak';

export class AuthService {         
    configure(config){
        this.Keycloak = new Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
}
