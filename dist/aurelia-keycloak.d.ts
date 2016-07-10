import {
  noView
} from 'aurelia-framework';
export declare class AuthService {
  constructor(config?: any);
  configure(config?: any): any;
}

////export class Config {
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
//var authservice;
export declare function configure(aurelia?: any, config?: any): any;
export declare {
  AuthService
};