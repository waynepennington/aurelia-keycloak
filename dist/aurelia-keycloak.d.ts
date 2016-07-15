export declare class PersistentStorage {
  constructor();
  useCookieStorage(): any;
  setitem(key?: any, value?: any): any;
  getItem(key?: any): any;
  removeItem(key?: any): any;
  cookieExpiration(minutes?: any): any;
  getCookie(key?: any): any;
  setCookie(key?: any, value?: any, expirationDate?: any): any;
}
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
  processCallback(oauth?: any, promise?: any): any;
  loadConfig(url?: any): any;
  setToken(token?: any, refreshToken?: any, idToken?: any, useTokenTime?: any): any;
  decodeToken(str?: any): any;
  createUUID(): any;
  createCallbackId(): any;
  parseCallback(url?: any): any;
  createPromise(): any;
  setupCheckLoginIframe(): any;
  checkLoginIframe(): any;
  loadAdapter(type?: any): any;
}