import {Keycloak} from './keycloak';
import {noView} from 'aurelia-framework';

export class AuthService {
    constructor(config){
        this.keycloak = null;
      }
      configure(config){
        var installURL;
        if ( typeof config.install == 'undefined'){
            installURL = 'keycloak.json';
        }else{
            installURL = config.install;           
        }
        this.keycloak = Keycloak(installURL);
        
        if ( typeof config.initOption !== 'undefined'){
            this.keycloak.init(config.initOptions);
        }
      }
}


//import {Keycloak} from './keycloak';
//export class Config {
//    constructor(){
//        this.keycloak = null;
//    }
//    newKeycloak(config){
//        this.keycloak = new Keycloak();
//    }
//    init(initOptions){
//        this.keycloak.init(initOptions);
//        return this;
//    }
//    get(){
//        return this.keycloak;
//    }
//    }
