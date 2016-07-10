import {keycloak} from './keycloak';

export class AuthService {

    configure(config){
        var installURL;
        // if ( typeof config.install == 'undefined'){
        //     installURL = 'keycloak.json';
        // }else{
        //     installURL = config.install;           
        // }
        // let keycloak = new Keycloak(installURL);
        let authK = new Keycloak(config.install);
        if ( typeof config.initOption !== 'undefined'){
            authk.init(config.initOptions);
        }
    }
}
