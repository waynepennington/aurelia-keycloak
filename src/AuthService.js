import {Keycloak} from './keycloak';
import {inject} from 'aurelia-framework';

@inject(Keycloak)
export class AuthService { 
    constructor(keycloak){
        this.Keycloak = keycloak;
    }        
    configure(config){
        this.Keycloak = Keycloak(config.install);
        if (typeof config.initOption !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
}
