import {keycloak} from './keycloak';

export class AuthService {
    static init () {
        this.Auth = new Keycloak();
    }
         
    configure(config){
        this.Auth.loadConfig(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Auth.init(config.initOptions);
        }
    }
}
