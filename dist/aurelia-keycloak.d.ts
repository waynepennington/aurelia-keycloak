import {
  noView
} from 'aurelia-framework';
export declare class AuthService {
  constructor();
  configure(configKC?: any): any;
  init(initOptions?: any): any;
  login(options?: any): any;
  createLoginUrl(options?: any): any;
  logout(options?: any): any;
  createLogoutUrl(options?: any): any;
  register(options?: any): any;
  createRegisterUrl(options?: any): any;
  createAccountUrl(options?: any): any;
  accountManagement(): any;
  hasRealmRole(role?: any): any;
  hasResourceRole(role?: any, resource?: any): any;
  loadUserProfile(): any;
  loadUserInfo(): any;
  isTokenExpired(minValidity?: any): any;
  updateToken(minValidity?: any): any;
  clearToken(): any;
  getRealmUrl(): any;
  getOrigin(): any;
  processCallback(oauth?: any, p_romise?: any): any;
  loadConfig(url?: any): any;
  setToken(token?: any, refreshToken?: any, idToken?: any, useTokenTime?: any): any;
  decodeToken(str?: any): any;
  createUUID(): any;
  createCallbackId(): any;
  parseCallback(url?: any): any;
  createP_romise(): any;
  setupCheckLoginIframe(): any;
  checkLoginIframe(): any;
  loadAdapter(type?: any): any;
}