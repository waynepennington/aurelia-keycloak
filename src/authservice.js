import {Keycloak} from './keycloak';
// import {inject} from 'aurelia-framework';

// @inject(Keycloak)
export class AuthService { 
    constructor(){
        this.keycloak = {};
    }
    configure(aurelia, config){
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);                                  
        }
    }
    
}
