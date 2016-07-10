import {keycloak} from './keycloak';
import {noView} from 'aurelia-framework';

export class AuthService {
    keycloak = null;

    configure(config){
        var installURL;
        if ( typeof config.install == 'undefined'){
            installURL = 'keycloak.json';
        }else{
            installURL = config.install;           
        }
        this.keycloak = new Keycloak(installURL);
        
        if ( typeof config.initOption !== 'undefined'){
            this.keycloak.init(config.initOptions);
        }
    }
}
