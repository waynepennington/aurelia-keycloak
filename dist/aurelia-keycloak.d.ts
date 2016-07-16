import {
  noView
} from 'aurelia-framework';

/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// (function( window, undefined ) {
export declare class Keycloak {
  constructor(config?: any);
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

// if ( typeof module === "object" && module && typeof module.exports === "object" ) {
// module.exports = Keycloak;
// } else {
//     window.Keycloak = Keycloak;
//     if ( typeof define === "function" && define.amd ) {
//         define( "keycloak", [], function () { return Keycloak; } );
//     }
// }
// })( window );
export declare class AuthService {
  constructor();
  configure(aurelia?: any, config?: any): any;
}