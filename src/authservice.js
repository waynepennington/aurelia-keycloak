import {keycloak} from 'keycloak';

export class AuthService {

    configure(config){
        var installURL;
        // if ( typeof config.install == 'undefined'){
        //     installURL = 'keycloak.json';
        // }else{
        //     installURL = config.install;           
        // }
        // let keycloak = new Keycloak(installURL);
        let keycloak = new Keycloak(config.install);
        if ( typeof config.initOption !== 'undefined'){
            this.keycloak.init(config.initOptions);
        }
    }
}
