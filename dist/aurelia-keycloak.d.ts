import {
  noView
} from 'aurelia-framework';
export declare class AuthService {
  
  // constructor(){
  //     this.keycloak = null;
  // }
  static keycloak: any;
  static installKeycloak(installConfig?: any): any;
  static initKeycloak(initOptions?: any): any;
  configure(aurelia?: any, config?: any): any;
}