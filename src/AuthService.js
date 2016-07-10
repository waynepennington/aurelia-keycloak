import {keycloak} from './keycloak';
import {inject} from 'aurelia-framework';

@inject(keycloak)
export class AuthService {
    constructor(kc){
        let keycloak = kc.Keycloak;
    }
         
    configure(config){
        let keycloak = Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            keycloak.init(config.initOptions);
        }
    }
}
