import {noView} from 'aurelia-framework';

// export class CallbackParser {

//     constructor(uriToParse, responseMode) {
//         this.parsedUri = null;
//         this.baseUri = null;
//         this.queryString = null;
//         this.fragmentString = null;
//         this.questionMarkIndex = uriToParse.indexOf("?");
//         this.fragmentIndex = uriToParse.indexOf("#", questionMarkIndex + 1);
//         if (questionMarkIndex == -1 && fragmentIndex == -1) {
//             this.baseUri = uriToParse;
//         } else if (questionMarkIndex != -1) {
//             this.baseUri = uriToParse.substring(0, questionMarkIndex);
//             this.queryString = uriToParse.substring(questionMarkIndex + 1);
//             if (fragmentIndex != -1) {
//                 fragmentIndex = this.queryString.indexOf("#");
//                 this.fragmentString = this.queryString.substring(fragmentIndex + 1);
//                 this.queryString = this.queryString.substring(0, fragmentIndex);
//             }
//         } else {
//             this.baseUri = uriToParse.substring(0, fragmentIndex);
//             this.fragmentString = uriToParse.substring(fragmentIndex + 1);
//         }
//                 this.parsedUri = initialParse();
//         this.queryParams = {};
//         if (this.parsedUri.queryString) {
//             this.queryParams = parseParams(this.parsedUri.queryString);
//         }
//         this.oauth = { newUrl: this.parsedUri.baseUri };
//         for (param in this.queryParams) {
//             switch (param) {
//                 case 'redirect_fragment':
//                     oauth.fragment = this.queryParams[param];
//                     break;
//                 case 'prompt':
//                     oauth.prompt = this.queryParams[param];
//                     break;
//                 default:
//                     if (responseMode != 'query' || !handleQueryParam(param, this.queryParams[param], oauth)) {
//                         oauth.newUrl += (oauth.newUrl.indexOf('?') == -1 ? '?' : '&') + param + '=' + queryParams[param];
//                     }
//                     break;
//             }
//         }
//         if (responseMode === 'fragment') {
//             this.fragmentParams = {};
//             if (this.parsedUri.fragmentString) {
//                 fragmentParams = parseParams(this.parsedUri.fragmentString);
//             }
//             for (param in fragmentParams) {
//                 oauth[param] = fragmentParams[param];
//             }
//         }
//         this.parseUri = oauth;
//     }

//     parseParams(paramString){
//         result = {};
//         params = paramString.split('&');
//         for (i = 0; i < params.length; i++) {
//             p = params[i].split('=');
//             paramName = decodeURIComponent(p[0]);
//             paramValue = decodeURIComponent(p[1]);
//             result[paramName] = paramValue;
//         }
//         return result;
//     }
//     handleQueryParam(paramName, paramValue, oauth) {
//         supportedOAuthParams = ['code', 'error', 'state'];
//         for (i = 0; i < supportedOAuthParams.length; i++) {
//             if (paramName === supportedOAuthParams[i]) {
//                 oauth[paramName] = paramValue;
//                 return true;
//             }
//         }
//         return false;
//     }

// }
// mmmmmmmmmmmmmmmmmmmmmmmmmmmmm
export class CallbackParser {
   constructor(uriToParse, responseMode) {
    var parser = this;
    var initialParse = function () {
        var baseUri = null;
        var queryString = null;
        var fragmentString = null;
        var questionMarkIndex = uriToParse.indexOf("?");
        var fragmentIndex = uriToParse.indexOf("#", questionMarkIndex + 1);
        if (questionMarkIndex == -1 && fragmentIndex == -1) {
            baseUri = uriToParse;
        } else if (questionMarkIndex != -1) {
            baseUri = uriToParse.substring(0, questionMarkIndex);
            queryString = uriToParse.substring(questionMarkIndex + 1);
            if (fragmentIndex != -1) {
                fragmentIndex = queryString.indexOf("#");
                fragmentString = queryString.substring(fragmentIndex + 1);
                queryString = queryString.substring(0, fragmentIndex);
            }
        } else {
            baseUri = uriToParse.substring(0, fragmentIndex);
            fragmentString = uriToParse.substring(fragmentIndex + 1);
        }
        return { baseUri: baseUri, queryString: queryString, fragmentString: fragmentString };
    }
    var parseParams = function (paramString) {
        var result = {};
        var params = paramString.split('&');
        for (var i = 0; i < params.length; i++) {
            var p = params[i].split('=');
            var paramName = decodeURIComponent(p[0]);
            var paramValue = decodeURIComponent(p[1]);
            result[paramName] = paramValue;
        }
        return result;
    }
    var handleQueryParam = function (paramName, paramValue, oauth) {
        var supportedOAuthParams = ['code', 'error', 'state'];
        for (var i = 0; i < supportedOAuthParams.length; i++) {
            if (paramName === supportedOAuthParams[i]) {
                oauth[paramName] = paramValue;
                return true;
            }
        }
        return false;
    }
    parser.parseUri = function () {
        var parsedUri = initialParse();
        var queryParams = {};
        if (parsedUri.queryString) {
            queryParams = parseParams(parsedUri.queryString);
        }
        var oauth = { newUrl: parsedUri.baseUri };
        for (var param in queryParams) {
            switch (param) {
                case 'redirect_fragment':
                    oauth.fragment = queryParams[param];
                    break;
                case 'prompt':
                    oauth.prompt = queryParams[param];
                    break;
                default:
                    if (responseMode != 'query' || !handleQueryParam(param, queryParams[param], oauth)) {
                        oauth.newUrl += (oauth.newUrl.indexOf('?') == -1 ? '?' : '&') + param + '=' + queryParams[param];
                    }
                    break;
            }
        }
        if (responseMode === 'fragment') {
            var fragmentParams = {};
            if (parsedUri.fragmentString) {
                fragmentParams = parseParams(parsedUri.fragmentString);
            }
            for (var param in fragmentParams) {
                oauth[param] = fragmentParams[param];
            }
        }
        return oauth;
    }
}
}
export class PersistentStorage {
    constructor() {
        this.bogusconstructor=null;
    }
    useCookieStorage() {
        if (typeof localStorage === "undefined") {
            return true;
        }
        try {
            key = '@@keycloak-session-storage/test';
            localStorage.setItem(key, 'test');
            localStorage.removeItem(key);
            return false;
        } catch (err) {
            return true;
        }
    };

    setitem(key, value) {
        if (useCookieStorage()) {
            setCookie(key, value, cookieExpiration(5));
        } else {
            localStorage.setItem(key, value);
        }
    };

    getItem(key) {
        if (useCookieStorage()) {
            return getCookie(key);
        }
        return localStorage.getItem(key);
    };

    removeItem(key) {
        if (typeof localStorage !== "undefined") {
            try {
                localStorage.removeItem(key);
            } catch (err) { }
        }

        setCookie(key, '', cookieExpiration(-100));
    };

    cookieExpiration(minutes) {
        exp = new Date();
        exp.setTime(exp.getTime() + minutes * 60 * 1000);
        return exp;
    };

    getCookie(key) {
        name = key + '=';
        ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };

    setCookie(key, value, expirationDate) {
        cookie = key + '=' + value + '; ' + 'expires=' + expirationDate.toUTCString() + '; ';
        document.cookie = cookie;
    };
};
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
export class Keycloak{
    constructor(config){
        this.config = config;
        this.adapter;
        this.refreshQueue = [];
        this.storage;

        this.loginIframe = {
            enable: true,
            callbackMap: [],
            interval: 5
        };
        this.callback_id = 0;
    }


init (initOptions) {

            this.authenticated = false;

            this.storage = new PersistentStorage();

            if (initOptions && initOptions.adapter === 'cordova') {
               this.adapter = loadAdapter('cordova');
            } else if (initOptions && initOptions.adapter === 'default') {
                this.adapter = loadAdapter();
            } else {
                if (window.Cordova) {
                    this.adapter = loadAdapter('cordova');
                } else {
                    this.adapter = loadAdapter();
                }
            }

            if (initOptions) {
                if (typeof initOptions.checkLoginIframe !== 'undefined') {
                    this.loginIframe.enable = initOptions.checkLoginIframe;
                }

                if (initOptions.checkLoginIframeInterval) {
                    this.loginIframe.interval = initOptions.checkLoginIframeInterval;
                }

                if (initOptions.onLoad === 'login-required') {
                    this.loginRequired = true;
                }

                if (initOptions.responseMode) {
                    if (initOptions.responseMode === 'query' || initOptions.responseMode === 'fragment') {
                        this.responseMode = initOptions.responseMode;
                    } else {
                        throw 'Invalid value for responseMode';
                    }
                }

                if (initOptions.flow) {
                    switch (initOptions.flow) {
                        case 'standard':
                            this.responseType = 'code';
                            break;
                        case 'implicit':
                            this.responseType = 'id_token token';
                            break;
                        case 'hybrid':
                            this.responseType = 'code id_token token';
                            break;
                        default:
                            throw 'Invalid value for flow';
                    }
                    this.flow = initOptions.flow;
                }
            }

            if (!this.responseMode) {
                this.responseMode = 'fragment';
            }
            if (!this.responseType) {
                this.responseType = 'code';
                this.flow = 'standard';
            }

            var promise = createPromise();

            var initPromise = createPromise();
            initPromise.promise.success(function() {
                this.onReady && this.onReady(this.authenticated);
                promise.setSuccess(this.authenticated);
            }).error(function() {
                promise.setError();
            });

            var configPromise = loadConfig(this.config);

            function onLoad() {
                var doLogin = function(prompt) {
                    if (!prompt) {
                        options.prompt = 'none';
                    }
                    this.login(options).success(function () {
                        initPromise.setSuccess();
                    }).error(function () {
                        initPromise.setError();
                    });
                }

                var options = {};
                switch (initOptions.onLoad) {
                    case 'check-sso':
                        if (this.loginIframe.enable) {
                            setupCheckLoginIframe().success(function() {
                                checkLoginIframe().success(function () {
                                    doLogin(false);
                                }).error(function () {
                                    initPromise.setSuccess();
                                });
                            });
                        } else {
                            doLogin(false);
                        }
                        break;
                    case 'login-required':
                        doLogin(true);
                        break;
                    default:
                        throw 'Invalid value for onLoad';
                }
            }

            function processInit() {
                var callback = parseCallback(window.location.href);

                if (callback) {
                    setupCheckLoginIframe();
                    window.history.replaceState({}, null, callback.newUrl);
                    processCallback(callback, initPromise);
                    return;
                } else if (initOptions) {
                    if (initOptions.token || initOptions.refreshToken) {
                        setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken, false);
                        this.timeSkew = initOptions.timeSkew || 0;

                        if (this.loginIframe.enable) {
                            setupCheckLoginIframe().success(function() {
                                checkLoginIframe().success(function () {
                                    initPromise.setSuccess();
                                }).error(function () {
                                    if (initOptions.onLoad) {
                                        onLoad();
                                    }
                                });
                            });
                        } else {
                            initPromise.setSuccess();
                        }
                    } else if (initOptions.onLoad) {
                        onLoad();
                    } else {
                        initPromise.setSuccess();
                    }
                } else {
                    initPromise.setSuccess();
                }
            }

            configPromise.success(processInit);
            configPromise.error(function() {
                promise.setError();
            });

            return promise.promise;
        }

       login (options) {
            return this.adapter.login(options);
        }

        createLoginUrl(options) {
            var state = createUUID();
            var nonce = createUUID();

            var redirectUri = this.adapter.redirectUri(options);
            if (options && options.prompt) {
                redirectUri += (redirectUri.indexOf('?') == -1 ? '?' : '&') + 'prompt=' + options.prompt;
            }

            this.storage.setItem('oauthState', JSON.stringify({ state: state, nonce: nonce, redirectUri: encodeURIComponent(redirectUri) }));

            var action = 'auth';
            if (options && options.action == 'register') {
                action = 'registrations';
            }

            var url = getRealmUrl()
                + '/protocol/openid-connect/' + action
                + '?client_id=' + encodeURIComponent(this.clientId)
                + '&redirect_uri=' + encodeURIComponent(redirectUri)
                + '&state=' + encodeURIComponent(state)
                + '&nonce=' + encodeURIComponent(nonce)
                + '&response_mode=' + encodeURIComponent(this.responseMode)
                + '&response_type=' + encodeURIComponent(this.responseType);

            if (options && options.prompt) {
                url += '&prompt=' + encodeURIComponent(options.prompt);
            }

            if (options && options.loginHint) {
                url += '&login_hint=' + encodeURIComponent(options.loginHint);
            }

            if (options && options.idpHint) {
                url += '&kc_idp_hint=' + encodeURIComponent(options.idpHint);
            }

            if (options && options.scope) {
                url += '&scope=' + encodeURIComponent(options.scope);
            }

            if (options && options.locale) {
                url += '&ui_locales=' + encodeURIComponent(options.locale);
            }

            return url;
        }

        logout(options) {
            return this.adapter.logout(options);
        }

        createLogoutUrl(options) {
            var url = getRealmUrl()
                + '/protocol/openid-connect/logout'
                + '?redirect_uri=' + encodeURIComponent(this.adapter.redirectUri(options, false));

            return url;
        }

        register (options) {
            return this.adapter.register(options);
        }

        createRegisterUrl(options) {
            if (!options) {
                options = {};
            }
            options.action = 'register';
            return this.createLoginUrl(options);
        }

        createAccountUrl(options) {
            var url = getRealmUrl()
                + '/account'
                + '?referrer=' + encodeURIComponent(this.clientId)
                + '&referrer_uri=' + encodeURIComponent(this.adapter.redirectUri(options));

            return url;
        }

        accountManagement() {
            return this.adapter.accountManagement();
        }

        hasRealmRole (role) {
            var access = this.realmAccess;
            return !!access && access.roles.indexOf(role) >= 0;
        }

        hasResourceRole(role, resource) {
            if (!this.resourceAccess) {
                return false;
            }

            var access = this.resourceAccess[resource || this.clientId];
            return !!access && access.roles.indexOf(role) >= 0;
        }

        loadUserProfile() {
            var url = getRealmUrl() + '/account';
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Authorization', 'bearer ' + this.token);

            var promise = createPromise();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        this.profile = JSON.parse(req.responseText);
                        promise.setSuccess(this.profile);
                    } else {
                        promise.setError();
                    }
                }
            }

            req.send();

            return promise.promise;
        }

        loadUserInfo() {
            var url = getRealmUrl() + '/protocol/openid-connect/userinfo';
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Authorization', 'bearer ' + this.token);

            var promise = createPromise();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        this.userInfo = JSON.parse(req.responseText);
                        promise.setSuccess(this.userInfo);
                    } else {
                        promise.setError();
                    }
                }
            }

            req.send();

            return promise.promise;
        }

        isTokenExpired(minValidity) {
            if (!this.tokenParsed || (!this.refreshToken && this.flow != 'implicit' )) {
                throw 'Not authenticated';
            }

            var expiresIn = this.tokenParsed['exp'] - (new Date().getTime() / 1000) + this.timeSkew;
            if (minValidity) {
                expiresIn -= minValidity;
            }

            return expiresIn < 0;
        }

        updateToken(minValidity) {
            var promise = createPromise();

            if (!this.tokenParsed || !this.refreshToken) {
                promise.setError();
                return promise.promise;
            }

            minValidity = minValidity || 5;

            var exec = function() {
                if (!this.isTokenExpired(minValidity)) {
                    promise.setSuccess(false);
                } else {
                    var params = 'grant_type=refresh_token&' + 'refresh_token=' + this.refreshToken;
                    var url = getRealmUrl() + '/protocol/openid-connect/token';

                    this.refreshQueue.push(promise);

                    if (this.refreshQueue.length == 1) {
                        var req = new XMLHttpRequest();
                        req.open('POST', url, true);
                        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                        if (this.clientId && this.clientSecret) {
                            req.setRequestHeader('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
                        } else {
                            params += '&client_id=' + encodeURIComponent(this.clientId);
                        }

                        var timeLocal = new Date().getTime();

                        req.onreadystatechange = function () {
                            if (req.readyState == 4) {
                                if (req.status == 200) {
                                    timeLocal = (timeLocal + new Date().getTime()) / 2;

                                    var tokenResponse = JSON.parse(req.responseText);
                                    setToken(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], true);

                                    this.timeSkew = Math.floor(timeLocal / 1000) - this.tokenParsed.iat;

                                    this.onAuthRefreshSuccess && this.onAuthRefreshSuccess();
                                    for (var p = this.refreshQueue.pop(); p != null; p = this.refreshQueue.pop()) {
                                        p.setSuccess(true);
                                    }
                                } else {
                                    this.onAuthRefreshError && this.onAuthRefreshError();
                                    for (var p = this.refreshQueue.pop(); p != null; p = this.refreshQueue.pop()) {
                                        p.setError(true);
                                    }
                                }
                            }
                        };

                        req.send(params);
                    }
                }
            }

            if (this.loginIframe.enable) {
                var iframePromise = checkLoginIframe();
                iframePromise.success(function() {
                    exec();
                }).error(function() {
                    promise.setError();
                });
            } else {
                exec();
            }

            return promise.promise;
        }

        clearToken() {
            if (this.token) {
                setToken(null, null, null, true);
                this.onAuthLogout && this.onAuthLogout();
                if (this.loginRequired) {
                    this.login();
                }
            }
        }

        getRealmUrl() {
            if (this.authServerUrl.charAt(this.authServerUrl.length - 1) == '/') {
                return this.authServerUrl + 'realms/' + encodeURIComponent(this.realm);
            } else {
                return this.authServerUrl + '/realms/' + encodeURIComponent(this.realm);
            }
        }

        getOrigin() {
            if (!window.location.origin) {
                return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            } else {
                return window.location.origin;
            }
        }

        processCallback(oauth, promise) {
            var code = oauth.code;
            var error = oauth.error;
            var prompt = oauth.prompt;

            var timeLocal = new Date().getTime();

            if (error) {
                if (prompt != 'none') {
                    this.onAuthError && this.onAuthError();
                    promise && promise.setError();
                } else {
                    promise && promise.setSuccess();
                }
                return;
            } else if ((this.flow != 'standard') && (oauth.access_token || oauth.id_token)) {
                authSuccess(oauth.access_token, null, oauth.id_token, true);
            }

            if ((this.flow != 'implicit') && code) {
                var params = 'code=' + code + '&grant_type=authorization_code';
                var url = getRealmUrl() + '/protocol/openid-connect/token';

                var req = new XMLHttpRequest();
                req.open('POST', url, true);
                req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                if (this.clientId && this.clientSecret) {
                    req.setRequestHeader('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
                } else {
                    params += '&client_id=' + encodeURIComponent(this.clientId);
                }

                params += '&redirect_uri=' + oauth.redirectUri;

                req.withCredentials = true;

                req.onreadystatechange = function() {
                    if (req.readyState == 4) {
                        if (req.status == 200) {

                            var tokenResponse = JSON.parse(req.responseText);
                            authSuccess(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], this.flow === 'standard');
                        } else {
                            this.onAuthError && this.onAuthError();
                            promise && promise.setError();
                        }
                    }
                };

                req.send(params);
            }

            function authSuccess(accessToken, refreshToken, idToken, fulfillPromise) {
                timeLocal = (timeLocal + new Date().getTime()) / 2;

                setToken(accessToken, refreshToken, idToken, true);

                if ((this.tokenParsed && this.tokenParsed.nonce != oauth.storedNonce) ||
                    (this.refreshTokenParsed && this.refreshTokenParsed.nonce != oauth.storedNonce) ||
                    (this.idTokenParsed && this.idTokenParsed.nonce != oauth.storedNonce)) {

                    console.log('invalid nonce!');
                    this.clearToken();
                    promise && promise.setError();
                } else {
                    this.timeSkew = Math.floor(timeLocal / 1000) - this.tokenParsed.iat;

                    if (fulfillPromise) {
                        this.onAuthSuccess && this.onAuthSuccess();
                        promise && promise.setSuccess();
                    }
                }
            }

        }

        loadConfig(url) {
            var promise = createPromise();
            var configUrl;

            if (!this.config) {
                configUrl = 'keycloak.json';
            } else if (typeof this.config === 'string') {
                this.configUrl = this.config;
            }

            if (configUrl) {
                var req = new XMLHttpRequest();
                req.open('GET', configUrl, true);
                req.setRequestHeader('Accept', 'application/json');

                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 200) {
                            var responseConfig = JSON.parse(req.responseText);

                            this.authServerUrl = responseConfig['auth-server-url'];
                            this.realm = responseConfig['realm'];
                            this.clientId = responseConfig['resource'];
                            this.clientSecret = (responseConfig['credentials'] || {})['secret'];

                            promise.setSuccess();
                        } else {
                            promise.setError();
                        }
                    }
                };

                req.send();
            } else {
                if (!this.config['url']) {
                    var scripts = document.getElementsByTagName('script');
                    for (var i = 0; i < scripts.length; i++) {
                        if (scripts[i].src.match(/.*keycloak\.js/)) {
                            this.config.url = scripts[i].src.substr(0, scripts[i].src.indexOf('/js/keycloak.js'));
                            break;
                        }
                    }
                }

                if (!this.config.realm) {
                    throw 'realm missing';
                }

                if (!this.config.clientId) {
                    throw 'clientId missing';
                }

                this.authServerUrl = this.config.url;
                this.realm = this.config.realm;
                this.clientId = this.config.clientId;
                this.clientSecret = (this.config.credentials || {}).secret;

                promise.setSuccess();
            }

            return promise.promise;
        }

        setToken(token, refreshToken, idToken, useTokenTime) {
            if (this.tokenTimeoutHandle) {
                clearTimeout(this.tokenTimeoutHandle);
                this.tokenTimeoutHandle = null;
            }

            if (token) {
                this.token = token;
                this.tokenParsed = decodeToken(token);
                var sessionId = this.realm + '/' + this.tokenParsed.sub;
                if (this.tokenParsed.session_state) {
                    sessionId = sessionId + '/' + this.tokenParsed.session_state;
                }
                this.sessionId = sessionId;
                this.authenticated = true;
                this.subject = this.tokenParsed.sub;
                this.realmAccess = this.tokenParsed.realm_access;
                this.resourceAccess = this.tokenParsed.resource_access;

                if (this.onTokenExpired) {
                    var start = useTokenTime ? this.tokenParsed.iat : (new Date().getTime() / 1000);
                    var expiresIn = this.tokenParsed.exp - start;
                    this.tokenTimeoutHandle = setTimeout(this.onTokenExpired, expiresIn * 1000);
                }

            } else {
                delete this.token;
                delete this.tokenParsed;
                delete this.subject;
                delete this.realmAccess;
                delete this.resourceAccess;

                this.authenticated = false;
            }

            if (refreshToken) {
                this.refreshToken = refreshToken;
                this.refreshTokenParsed = decodeToken(refreshToken);
            } else {
                delete this.refreshToken;
                delete this.refreshTokenParsed;
            }

            if (idToken) {
                this.idToken = idToken;
                this.idTokenParsed = decodeToken(idToken);
            } else {
                delete this.idToken;
                delete this.idTokenParsed;
            }
        }

        decodeToken(str) {
            str = str.split('.')[1];

            str = str.replace('/-/g', '+');
            str = str.replace('/_/g', '/');
            switch (str.length % 4)
            {
                case 0:
                    break;
                case 2:
                    str += '==';
                    break;
                case 3:
                    str += '=';
                    break;
                default:
                    throw 'Invalid token';
            }

            str = (str + '===').slice(0, str.length + (str.length % 4));
            str = str.replace(/-/g, '+').replace(/_/g, '/');

            str = decodeURIComponent(escape(atob(str)));

            str = JSON.parse(str);
            return str;
        }

        createUUID() {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4';
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = '-';
            var uuid = s.join('');
            return uuid;
        }

        createCallbackId() {
            var id = '<id: ' + (this.callback_id++) + (Math.random()) + '>';
            return id;

        }

        parseCallback(url) {
            var oauth = new CallbackParser(url, this.responseMode).parseUri();

            var oauthState = this.storage.getItem('oauthState');
            var sessionState = oauthState && JSON.parse(oauthState);

            if (sessionState && (oauth.code || oauth.error || oauth.access_token || oauth.id_token) && oauth.state && oauth.state == sessionState.state) {
                this.storage.removeItem('oauthState');

                oauth.redirectUri = sessionState.redirectUri;
                oauth.storedNonce = sessionState.nonce;

                if (oauth.fragment) {
                    oauth.newUrl += '#' + oauth.fragment;
                }

                return oauth;
            }
        }

        createPromise() {
            var p = {
                setSuccess: function(result) {
                    p.success = true;
                    p.result = result;
                    if (p.successCallback) {
                        p.successCallback(result);
                    }
                },

                setError: function(result) {
                    p.error = true;
                    p.result = result;
                    if (p.errorCallback) {
                        p.errorCallback(result);
                    }
                },

                promise: {
                    success: function(callback) {
                        if (p.success) {
                            callback(p.result);
                        } else if (!p.error) {
                            p.successCallback = callback;
                        }
                        return p.promise;
                    },
                    error: function(callback) {
                        if (p.error) {
                            callback(p.result);
                        } else if (!p.success) {
                            p.errorCallback = callback;
                        }
                        return p.promise;
                    }
                }
            }
            return p;
        }

        setupCheckLoginIframe() {
            var promise = createPromise();

            if (!this.loginIframe.enable) {
                promise.setSuccess();
                return promise.promise;
            }

            if (this.loginIframe.iframe) {
                promise.setSuccess();
                return promise.promise;
            }

            var iframe = document.createElement('iframe');
            this.loginIframe.iframe = iframe;

            iframe.onload = function() {
                var realmUrl = getRealmUrl();
                if (realmUrl.charAt(0) === '/') {
                    this.loginIframe.iframeOrigin = getOrigin();
                } else {
                    this.loginIframe.iframeOrigin = realmUrl.substring(0, realmUrl.indexOf('/', 8));
                }
                promise.setSuccess();

                setTimeout(check, this.loginIframe.interval * 1000);
            }

            var src = getRealmUrl() + '/protocol/openid-connect/login-status-iframe.html?client_id=' + encodeURIComponent(this.clientId) + '&origin=' + getOrigin();
            iframe.setAttribute('src', src );
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            var messageCallback = function(event) {
                if (event.origin !== this.loginIframe.iframeOrigin) {
                    return;
                }
                var data = JSON.parse(event.data);
                var promise = this.loginIframe.callbackMap[data.callbackId];
                delete this.loginIframe.callbackMap[data.callbackId];

                if ((!this.sessionId || this.sessionId == data.session) && data.loggedIn) {
                    promise.setSuccess();
                } else {
                    this.clearToken();
                    promise.setError();
                }
            };
            window.addEventListener('message', messageCallback, false);

            var check = function() {
                checkLoginIframe();
                if (this.token) {
                    setTimeout(check, this.loginIframe.interval * 1000);
                }
            };

            return promise.promise;
        }

        checkLoginIframe() {
            var promise = createPromise();

            if (this.loginIframe.iframe && this.loginIframe.iframeOrigin) {
                var msg = {};
                msg.callbackId = createCallbackId();
                this.loginIframe.callbackMap[msg.callbackId] = promise;
                var origin = this.loginIframe.iframeOrigin;
                this.loginIframe.iframe.contentWindow.postMessage(JSON.stringify(msg), origin);
            } else {
                promise.setSuccess();
            }

            return promise.promise;
        }

        loadAdapter(type) {
            if (!type || type == 'default') {
                return {
                    login: function(options) {
                        window.location.href = this.createLoginUrl(options);
                        return createPromise().promise;
                    },

                    logout: function(options) {
                        window.location.href = this.createLogoutUrl(options);
                        return createPromise().promise;
                    },

                    register: function(options) {
                        window.location.href = this.createRegisterUrl(options);
                        return createPromise().promise;
                    },

                    accountManagement : function() {
                        window.location.href = this.createAccountUrl();
                        return createPromise().promise;
                    },

                    redirectUri: function(options, encodeHash) {
                        if (arguments.length == 1) {
                            encodeHash = true;
                        }

                        if (options && options.redirectUri) {
                            return options.redirectUri;
                        } else if (this.redirectUri) {
                            return this.redirectUri;
                        } else {
                            var redirectUri = location.href;
                            if (location.hash && encodeHash) {
                                redirectUri = redirectUri.substring(0, location.href.indexOf('#'));
                                redirectUri += (redirectUri.indexOf('?') == -1 ? '?' : '&') + 'redirect_fragment=' + encodeURIComponent(location.hash.substring(1));
                            }
                            return redirectUri;
                        }
                    }
                };
            }

            if (type == 'cordova') {
                this.loginIframe.enable = false;

                return {
                    login: function(options) {
                        var promise = createPromise();

                        var o = 'location=no';
                        if (options && options.prompt == 'none') {
                            o += ',hidden=yes';
                        }

                        var loginUrl = this.createLoginUrl(options);
                        var ref = window.open(loginUrl, '_blank', o);

                        var completed = false;

                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                var callback = parseCallback(event.url);
                                processCallback(callback, promise);
                                ref.close();
                                completed = true;
                            }
                        });

                        ref.addEventListener('loaderror', function(event) {
                            if (!completed) {
                                if (event.url.indexOf('http://localhost') == 0) {
                                    var callback = parseCallback(event.url);
                                    processCallback(callback, promise);
                                    ref.close();
                                    completed = true;
                                } else {
                                    promise.setError();
                                    ref.close();
                                }
                            }
                        });

                        return promise.promise;
                    },

                    logout: function(options) {
                        var promise = createPromise();

                        var logoutUrl = this.createLogoutUrl(options);
                        var ref = window.open(logoutUrl, '_blank', 'location=no,hidden=yes');

                        var error;

                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            }
                        });

                        ref.addEventListener('loaderror', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            } else {
                                error = true;
                                ref.close();
                            }
                        });

                        ref.addEventListener('exit', function(event) {
                            if (error) {
                                promise.setError();
                            } else {
                                this.clearToken();
                                promise.setSuccess();
                            }
                        });

                        return promise.promise;
                    },

                    register : function() {
                        var registerUrl = this.createRegisterUrl();
                        var ref = window.open(registerUrl, '_blank', 'location=no');
                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            }
                        });
                    },

                    accountManagement : function() {
                        var accountUrl = this.createAccountUrl();
                        var ref = window.open(accountUrl, '_blank', 'location=no');
                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            }
                        });
                    },

                    redirectUri: function(options) {
                        return 'http://localhost';
                    }
                }
            }

            throw 'invalid adapter type: ' + type;
        }


        // var PersistentStorage = function() {
        //     if (!(this instanceof PersistentStorage)) {
        //         return new PersistentStorage();
        //     }
        //     var ps = this;
        //     var useCookieStorage = function () {
        //         if (typeof localStorage === "undefined") {
        //             return true;
        //         }
        //         try {
        //             var key = '@@keycloak-session-storage/test';
        //             localStorage.setItem(key, 'test');
        //             localStorage.removeItem(key);
        //             return false;
        //         } catch (err) {
        //             // Probably in Safari "private mode" where localStorage
        //             // quota is 0, or quota exceeded. Switching to cookie
        //             // storage.
        //             return true;
        //         }
        //     }

        //     ps.setItem = function(key, value) {
        //         if (useCookieStorage()) {
        //             setCookie(key, value, cookieExpiration(5));
        //         } else {
        //             localStorage.setItem(key, value);
        //         }
        //     }

        //     ps.getItem = function(key) {
        //         if (useCookieStorage()) {
        //             return getCookie(key);
        //         }
        //         return localStorage.getItem(key);
        //     }

        //     ps.removeItem = function(key) {
        //         if (typeof localStorage !== "undefined") {
        //             try {
        //                 // Always try to delete from localStorage.
        //                 localStorage.removeItem(key);
        //             } catch (err) { }
        //         }
        //         // Always remove the cookie.
        //         setCookie(key, '', cookieExpiration(-100));
        //     }

        //     var cookieExpiration = function (minutes) {
        //         var exp = new Date();
        //         exp.setTime(exp.getTime() + (minutes*60*1000));
        //         return exp;
        //     }

        //     var getCookie = function (key) {
        //         var name = key + '=';
        //         var ca = document.cookie.split(';');
        //         for (var i = 0; i < ca.length; i++) {
        //             var c = ca[i];
        //             while (c.charAt(0) == ' ') {
        //                 c = c.substring(1);
        //             }
        //             if (c.indexOf(name) == 0) {
        //                 return c.substring(name.length, c.length);
        //             }
        //         }
        //         return '';
        //     }

        //     var setCookie = function (key, value, expirationDate) {
        //         var cookie = key + '=' + value + '; '
        //             + 'expires=' + expirationDate.toUTCString() + '; ';
        //         document.cookie = cookie;
        //     }
        // }

        // var CallbackParser = function(uriToParse, responseMode) {
        //     if (!(this instanceof CallbackParser)) {
        //         return new CallbackParser(uriToParse, responseMode);
        //     }
        //     var parser = this;

        //     var initialParse = function() {
        //         var baseUri = null;
        //         var queryString = null;
        //         var fragmentString = null;

        //         var questionMarkIndex = uriToParse.indexOf("?");
        //         var fragmentIndex = uriToParse.indexOf("#", questionMarkIndex + 1);
        //         if (questionMarkIndex == -1 && fragmentIndex == -1) {
        //             baseUri = uriToParse;
        //         } else if (questionMarkIndex != -1) {
        //             baseUri = uriToParse.substring(0, questionMarkIndex);
        //             queryString = uriToParse.substring(questionMarkIndex + 1);
        //             if (fragmentIndex != -1) {
        //                 fragmentIndex = queryString.indexOf("#");
        //                 fragmentString = queryString.substring(fragmentIndex + 1);
        //                 queryString = queryString.substring(0, fragmentIndex);
        //             }
        //         } else {
        //             baseUri = uriToParse.substring(0, fragmentIndex);
        //             fragmentString = uriToParse.substring(fragmentIndex + 1);
        //         }

        //         return { baseUri: baseUri, queryString: queryString, fragmentString: fragmentString };
        //     }

        //     var parseParams = function(paramString) {
        //         var result = {};
        //         var params = paramString.split('&');
        //         for (var i = 0; i < params.length; i++) {
        //             var p = params[i].split('=');
        //             var paramName = decodeURIComponent(p[0]);
        //             var paramValue = decodeURIComponent(p[1]);
        //             result[paramName] = paramValue;
        //         }
        //         return result;
        //     }

        //     var handleQueryParam = function(paramName, paramValue, oauth) {
        //         var supportedOAuthParams = [ 'code', 'error', 'state' ];

        //         for (var i = 0 ; i< supportedOAuthParams.length ; i++) {
        //             if (paramName === supportedOAuthParams[i]) {
        //                 oauth[paramName] = paramValue;
        //                 return true;
        //             }
        //         }
        //         return false;
        //     }


        //     parser.parseUri = function() {
        //         var parsedUri = initialParse();

        //         var queryParams = {};
        //         if (parsedUri.queryString) {
        //             queryParams = parseParams(parsedUri.queryString);
        //         }

        //         var oauth = { newUrl: parsedUri.baseUri };
        //         for (var param in queryParams) {
        //             switch (param) {
        //                 case 'redirect_fragment':
        //                     oauth.fragment = queryParams[param];
        //                     break;
        //                 case 'prompt':
        //                     oauth.prompt = queryParams[param];
        //                     break;
        //                 default:
        //                     if (responseMode != 'query' || !handleQueryParam(param, queryParams[param], oauth)) {
        //                         oauth.newUrl += (oauth.newUrl.indexOf('?') == -1 ? '?' : '&') + param + '=' + queryParams[param];
        //                     }
        //                     break;
        //             }
        //         }

        //         if (responseMode === 'fragment') {
        //             var fragmentParams = {};
        //             if (parsedUri.fragmentString) {
        //                 fragmentParams = parseParams(parsedUri.fragmentString);
        //             }
        //             for (var param in fragmentParams) {
        //                 oauth[param] = fragmentParams[param];
        //             }
        //         }

        //         return oauth;
        //     }
        // }

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

@noView
export class AuthService { 
    constructor(){
        this.keycloak = {};
    }
    configure(aurelia,config){
        // this.kc = new Keycloak(config.install);
        // let kc = new keycloak.Keycloak(config.install);
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);                                  
        }
    }
    
}
// // // // @noView
// export class AuthService {
//     constructor() {
//         this.authenticated = false;
//         this.config;
//         this.adapter;
//         this.refreshQueue = [];
//         this.storage;
//         this.loginIframe = {
//             enable: true,
//             callbackMap: [],
//             interval: 5
//         };
//         this.callback_id = 0;
//     }
//     configure(configKC) {
//         this.config = configKC.install;
//         if (typeof configKC.initOptions !== 'undefined') {
//             this.init(configKC.initOptions);
//         }
//     }
//     init(initOptions) {
//         this.authenticated = false;
//         storage = new PersistentStorage();
//         if (initOptions && initOptions.adapter === 'cordova') {
//             adapter = loadAdapter('cordova');
//         } else if (initOptions && initOptions.adapter === 'default') {
//             adapter = loadAdapter();
//         } else {
//             if (window.Cordova) {
//                 adapter = loadAdapter('cordova');
//             } else {
//                 adapter = loadAdapter();
//             }
//         }
//         if (initOptions) {
//             if (typeof initOptions.checkLoginIframe !== 'undefined') {
//                 loginIframe.enable = initOptions.checkLoginIframe;
//             }
//             if (initOptions.checkLoginIframeInterval) {
//                 loginIframe.interval = initOptions.checkLoginIframeInterval;
//             }
//             if (initOptions.onLoad === 'login-required') {
//                 this.loginRequired = true;
//             }
//             if (initOptions.responseMode) {
//                 if (initOptions.responseMode === 'query' || initOptions.responseMode === 'fragment') {
//                     this.responseMode = initOptions.responseMode;
//                 } else {
//                     throw 'Invalid value for responseMode';
//                 }
//             }
//             if (initOptions.flow) {
//                 switch (initOptions.flow) {
//                     case 'standard':
//                         this.responseType = 'code';
//                         break;
//                     case 'implicit':
//                         this.responseType = 'id_token token';
//                         break;
//                     case 'hybrid':
//                         this.responseType = 'code id_token token';
//                         break;
//                     default:
//                         throw 'Invalid value for flow';
//                 }
//                 this.flow = initOptions.flow;
//             }
//         }
//         if (!this.responseMode) {
//             this.responseMode = 'fragment';
//         }
//         if (!this.responseType) {
//             this.responseType = 'code';
//             this.flow = 'standard';
//         }
//         var p_romise = createP_romise();
//         var initP_romise = createP_romise();
//         initP_romise.p_romise.success(function () {
//             this.onReady && this.onReady(this.authenticated);
//             p_romise.setSuccess(this.authenticated);
//         }).error(function () {
//             p_romise.setError();
//         });
//         var configP_romise = loadConfig(config);
//         function onLoad() {
//             var doLogin = function (prompt) {
//                 if (!prompt) {
//                     options.prompt = 'none';
//                 }
//                 this.login(options).success(function () {
//                     initP_romise.setSuccess();
//                 }).error(function () {
//                     initP_romise.setError();
//                 });
//             }
//             var options = {};
//             switch (initOptions.onLoad) {
//                 case 'check-sso':
//                     if (loginIframe.enable) {
//                         setupCheckLoginIframe().success(function () {
//                             checkLoginIframe().success(function () {
//                                 doLogin(false);
//                             }).error(function () {
//                                 initP_romise.setSuccess();
//                             });
//                         });
//                     } else {
//                         doLogin(false);
//                     }
//                     break;
//                 case 'login-required':
//                     doLogin(true);
//                     break;
//                 default:
//                     throw 'Invalid value for onLoad';
//             }
//         }
//         function processInit() {
//             var callback = parseCallback(window.location.href);
//             if (callback) {
//                 setupCheckLoginIframe();
//                 window.history.replaceState({}, null, callback.newUrl);
//                 processCallback(callback, initP_romise);
//                 return;
//             } else if (initOptions) {
//                 if (initOptions.token || initOptions.refreshToken) {
//                     setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken, false);
//                     this.timeSkew = initOptions.timeSkew || 0;
//                     if (loginIframe.enable) {
//                         setupCheckLoginIframe().success(function () {
//                             checkLoginIframe().success(function () {
//                                 initP_romise.setSuccess();
//                             }).error(function () {
//                                 if (initOptions.onLoad) {
//                                     onLoad();
//                                 }
//                             });
//                         });
//                     } else {
//                         initP_romise.setSuccess();
//                     }
//                 } else if (initOptions.onLoad) {
//                     onLoad();
//                 } else {
//                     initP_romise.setSuccess();
//                 }
//             } else {
//                 initP_romise.setSuccess();
//             }
//         }
//         configP_romise.success(processInit);
//         configP_romise.error(function () {
//             p_romise.setError();
//         });
//         return p_romise.p_romise;
//     }
//     login(options) {
//         return adapter.login(options);
//     }
//     createLoginUrl(options) {
//         var state = createUUID();
//         var nonce = createUUID();
//         var redirectUri = adapter.redirectUri(options);
//         if (options && options.prompt) {
//             redirectUri += (redirectUri.indexOf('?') == -1 ? '?' : '&') + 'prompt=' + options.prompt;
//         }
//         storage.setItem('oauthState', JSON.stringify({ state: state, nonce: nonce, redirectUri: encodeURIComponent(redirectUri) }));
//         var action = 'auth';
//         if (options && options.action == 'register') {
//             action = 'registrations';
//         }
//         var url = getRealmUrl()
//             + '/protocol/openid-connect/' + action
//             + '?client_id=' + encodeURIComponent(this.clientId)
//             + '&redirect_uri=' + encodeURIComponent(redirectUri)
//             + '&state=' + encodeURIComponent(state)
//             + '&nonce=' + encodeURIComponent(nonce)
//             + '&response_mode=' + encodeURIComponent(this.responseMode)
//             + '&response_type=' + encodeURIComponent(this.responseType);
//         if (options && options.prompt) {
//             url += '&prompt=' + encodeURIComponent(options.prompt);
//         }
//         if (options && options.loginHint) {
//             url += '&login_hint=' + encodeURIComponent(options.loginHint);
//         }
//         if (options && options.idpHint) {
//             url += '&kc_idp_hint=' + encodeURIComponent(options.idpHint);
//         }
//         if (options && options.scope) {
//             url += '&scope=' + encodeURIComponent(options.scope);
//         }
//         if (options && options.locale) {
//             url += '&ui_locales=' + encodeURIComponent(options.locale);
//         }
//         return url;
//     }
//     logout(options) {
//         return adapter.logout(options);
//     }
//     createLogoutUrl(options) {
//         var url = getRealmUrl()
//             + '/protocol/openid-connect/logout'
//             + '?redirect_uri=' + encodeURIComponent(adapter.redirectUri(options, false));
//         return url;
//     }
//     register(options) {
//         return adapter.register(options);
//     }
//     createRegisterUrl(options) {
//         if (!options) {
//             options = {};
//         }
//         options.action = 'register';
//         return this.createLoginUrl(options);
//     }
//     createAccountUrl(options) {
//         var url = getRealmUrl()
//             + '/account'
//             + '?referrer=' + encodeURIComponent(this.clientId)
//             + '&referrer_uri=' + encodeURIComponent(adapter.redirectUri(options));
//         return url;
//     }
//     accountManagement() {
//         return adapter.accountManagement();
//     }
//     hasRealmRole(role) {
//         var access = this.realmAccess;
//         return !!access && access.roles.indexOf(role) >= 0;
//     }
//     hasResourceRole(role, resource) {
//         if (!this.resourceAccess) {
//             return false;
//         }
//         var access = this.resourceAccess[resource || this.clientId];
//         return !!access && access.roles.indexOf(role) >= 0;
//     }
//     loadUserProfile() {
//         var url = getRealmUrl() + '/account';
//         var req = new XMLHttpRequest();
//         req.open('GET', url, true);
//         req.setRequestHeader('Accept', 'application/json');
//         req.setRequestHeader('Authorization', 'bearer ' + this.token);
//         var p_romise = createP_romise();
//         req.onreadystatechange = function () {
//             if (req.readyState == 4) {
//                 if (req.status == 200) {
//                     this.profile = JSON.parse(req.responseText);
//                     p_romise.setSuccess(this.profile);
//                 } else {
//                     p_romise.setError();
//                 }
//             }
//         }
//         req.send();
//         return p_romise.p_romise;
//     }
//     loadUserInfo() {
//         var url = getRealmUrl() + '/protocol/openid-connect/userinfo';
//         var req = new XMLHttpRequest();
//         req.open('GET', url, true);
//         req.setRequestHeader('Accept', 'application/json');
//         req.setRequestHeader('Authorization', 'bearer ' + this.token);
//         var p_romise = createP_romise();
//         req.onreadystatechange = function () {
//             if (req.readyState == 4) {
//                 if (req.status == 200) {
//                     this.userInfo = JSON.parse(req.responseText);
//                     p_romise.setSuccess(this.userInfo);
//                 } else {
//                     p_romise.setError();
//                 }
//             }
//         }
//         req.send();
//         return p_romise.p_romise;
//     }
//     isTokenExpired(minValidity) {
//         if (!this.tokenParsed || (!this.refreshToken && this.flow != 'implicit')) {
//             throw 'Not authenticated';
//         }
//         var expiresIn = this.tokenParsed['exp'] - (new Date().getTime() / 1000) + this.timeSkew;
//         if (minValidity) {
//             expiresIn -= minValidity;
//         }
//         return expiresIn < 0;
//     }
//     updateToken(minValidity) {
//         var p_romise = createP_romise();
//         if (!this.tokenParsed || !this.refreshToken) {
//             p_romise.setError();
//             return p_romise.p_romise;
//         }
//         minValidity = minValidity || 5;
//         var exec = function () {
//             if (!this.isTokenExpired(minValidity)) {
//                 p_romise.setSuccess(false);
//             } else {
//                 var params = 'grant_type=refresh_token&' + 'refresh_token=' + this.refreshToken;
//                 var url = getRealmUrl() + '/protocol/openid-connect/token';
//                 refreshQueue.push(p_romise);
//                 if (refreshQueue.length == 1) {
//                     var req = new XMLHttpRequest();
//                     req.open('POST', url, true);
//                     req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//                     if (this.clientId && this.clientSecret) {
//                         req.setRequestHeader('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
//                     } else {
//                         params += '&client_id=' + encodeURIComponent(this.clientId);
//                     }
//                     var timeLocal = new Date().getTime();
//                     req.onreadystatechange = function () {
//                         if (req.readyState == 4) {
//                             if (req.status == 200) {
//                                 timeLocal = (timeLocal + new Date().getTime()) / 2;
//                                 var tokenResponse = JSON.parse(req.responseText);
//                                 setToken(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], true);
//                                 this.timeSkew = Math.floor(timeLocal / 1000) - this.tokenParsed.iat;
//                                 this.onAuthRefreshSuccess && this.onAuthRefreshSuccess();
//                                 for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
//                                     p.setSuccess(true);
//                                 }
//                             } else {
//                                 this.onAuthRefreshError && this.onAuthRefreshError();
//                                 for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
//                                     p.setError(true);
//                                 }
//                             }
//                         }
//                     };
//                     req.send(params);
//                 }
//             }
//         }
//         if (loginIframe.enable) {
//             var iframeP_romise = checkLoginIframe();
//             iframeP_romise.success(function () {
//                 exec();
//             }).error(function () {
//                 p_romise.setError();
//             });
//         } else {
//             exec();
//         }
//         return p_romise.p_romise;
//     }
//     clearToken() {
//         if (this.token) {
//             setToken(null, null, null, true);
//             this.onAuthLogout && this.onAuthLogout();
//             if (this.loginRequired) {
//                 this.login();
//             }
//         }
//     }
//     getRealmUrl() {
//         if (this.authServerUrl.charAt(this.authServerUrl.length - 1) == '/') {
//             return this.authServerUrl + 'realms/' + encodeURIComponent(this.realm);
//         } else {
//             return this.authServerUrl + '/realms/' + encodeURIComponent(this.realm);
//         }
//     }
//     getOrigin() {
//         if (!window.location.origin) {
//             return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
//         } else {
//             return window.location.origin;
//         }
//     }
//     processCallback(oauth, p_romise) {
//         var code = oauth.code;
//         var error = oauth.error;
//         var prompt = oauth.prompt;
//         var timeLocal = new Date().getTime();
//         if (error) {
//             if (prompt != 'none') {
//                 this.onAuthError && this.onAuthError();
//                 p_romise && p_romise.setError();
//             } else {
//                 p_romise && p_romise.setSuccess();
//             }
//             return;
//         } else if ((this.flow != 'standard') && (oauth.access_token || oauth.id_token)) {
//             authSuccess(oauth.access_token, null, oauth.id_token, true);
//         }
//         if ((this.flow != 'implicit') && code) {
//             var params = 'code=' + code + '&grant_type=authorization_code';
//             var url = getRealmUrl() + '/protocol/openid-connect/token';
//             var req = new XMLHttpRequest();
//             req.open('POST', url, true);
//             req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//             if (this.clientId && this.clientSecret) {
//                 req.setRequestHeader('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
//             } else {
//                 params += '&client_id=' + encodeURIComponent(this.clientId);
//             }
//             params += '&redirect_uri=' + oauth.redirectUri;
//             req.withCredentials = true;
//             req.onreadystatechange = function () {
//                 if (req.readyState == 4) {
//                     if (req.status == 200) {
//                         var tokenResponse = JSON.parse(req.responseText);
//                         authSuccess(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], this.flow === 'standard');
//                     } else {
//                         this.onAuthError && this.onAuthError();
//                         p_romise && p_romise.setError();
//                     }
//                 }
//             };
//             req.send(params);
//         }
//         function authSuccess(accessToken, refreshToken, idToken, fulfillP_romise) {
//             timeLocal = (timeLocal + new Date().getTime()) / 2;
//             setToken(accessToken, refreshToken, idToken, true);
//             if ((this.tokenParsed && this.tokenParsed.nonce != oauth.storedNonce) ||
//                 (this.refreshTokenParsed && this.refreshTokenParsed.nonce != oauth.storedNonce) ||
//                 (this.idTokenParsed && this.idTokenParsed.nonce != oauth.storedNonce)) {
//                 console.log('invalid nonce!');
//                 this.clearToken();
//                 p_romise && p_romise.setError();
//             } else {
//                 this.timeSkew = Math.floor(timeLocal / 1000) - this.tokenParsed.iat;
//                 if (fulfillP_romise) {
//                     this.onAuthSuccess && this.onAuthSuccess();
//                     p_romise && p_romise.setSuccess();
//                 }
//             }
//         }
//     }
//     loadConfig(url) {
//         var p_romise = createP_romise();
//         var configUrl;
//         if (!config) {
//             configUrl = 'keycloak.json';
//         } else if (typeof config === 'string') {
//             configUrl = config;
//         }
//         if (configUrl) {
//             var req = new XMLHttpRequest();
//             req.open('GET', configUrl, true);
//             req.setRequestHeader('Accept', 'application/json');
//             req.onreadystatechange = function () {
//                 if (req.readyState == 4) {
//                     if (req.status == 200) {
//                         var config = JSON.parse(req.responseText);
//                         this.authServerUrl = config['auth-server-url'];
//                         this.realm = config['realm'];
//                         this.clientId = config['resource'];
//                         this.clientSecret = (config['credentials'] || {})['secret'];
//                         p_romise.setSuccess();
//                     } else {
//                         p_romise.setError();
//                     }
//                 }
//             };
//             req.send();
//         } else {
//             if (!config['url']) {
//                 var scripts = document.getElementsByTagName('script');
//                 for (var i = 0; i < scripts.length; i++) {
//                     if (scripts[i].src.match(/.*keycloak\.js/)) {
//                         config.url = scripts[i].src.substr(0, scripts[i].src.indexOf('/js/keycloak.js'));
//                         break;
//                     }
//                 }
//             }
//             if (!config.realm) {
//                 throw 'realm missing';
//             }
//             if (!config.clientId) {
//                 throw 'clientId missing';
//             }
//             this.authServerUrl = config.url;
//             this.realm = config.realm;
//             this.clientId = config.clientId;
//             this.clientSecret = (config.credentials || {}).secret;
//             p_romise.setSuccess();
//         }
//         return p_romise.p_romise;
//     }
//     setToken(token, refreshToken, idToken, useTokenTime) {
//         if (this.tokenTimeoutHandle) {
//             clearTimeout(this.tokenTimeoutHandle);
//             this.tokenTimeoutHandle = null;
//         }
//         if (token) {
//             this.token = token;
//             this.tokenParsed = decodeToken(token);
//             var sessionId = this.realm + '/' + this.tokenParsed.sub;
//             if (this.tokenParsed.session_state) {
//                 sessionId = sessionId + '/' + this.tokenParsed.session_state;
//             }
//             this.sessionId = sessionId;
//             this.authenticated = true;
//             this.subject = this.tokenParsed.sub;
//             this.realmAccess = this.tokenParsed.realm_access;
//             this.resourceAccess = this.tokenParsed.resource_access;
//             if (this.onTokenExpired) {
//                 var start = useTokenTime ? this.tokenParsed.iat : (new Date().getTime() / 1000);
//                 var expiresIn = this.tokenParsed.exp - start;
//                 this.tokenTimeoutHandle = setTimeout(this.onTokenExpired, expiresIn * 1000);
//             }
//         } else {
//             delete this.token;
//             delete this.tokenParsed;
//             delete this.subject;
//             delete this.realmAccess;
//             delete this.resourceAccess;
//             this.authenticated = false;
//         }
//         if (refreshToken) {
//             this.refreshToken = refreshToken;
//             this.refreshTokenParsed = decodeToken(refreshToken);
//         } else {
//             delete this.refreshToken;
//             delete this.refreshTokenParsed;
//         }
//         if (idToken) {
//             this.idToken = idToken;
//             this.idTokenParsed = decodeToken(idToken);
//         } else {
//             delete this.idToken;
//             delete this.idTokenParsed;
//         }
//     }
//     decodeToken(str) {
//         str = str.split('.')[1];
//         str = str.replace('/-/g', '+');
//         str = str.replace('/_/g', '/');
//         switch (str.length % 4) {
//             case 0:
//                 break;
//             case 2:
//                 str += '==';
//                 break;
//             case 3:
//                 str += '=';
//                 break;
//             default:
//                 throw 'Invalid token';
//         }
//         str = (str + '===').slice(0, str.length + (str.length % 4));
//         str = str.replace(/-/g, '+').replace(/_/g, '/');
//         str = decodeURIComponent(escape(atob(str)));
//         str = JSON.parse(str);
//         return str;
//     }
//     createUUID() {
//         var s = [];
//         var hexDigits = '0123456789abcdef';
//         for (var i = 0; i < 36; i++) {
//             s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//         }
//         s[14] = '4';
//         s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
//         s[8] = s[13] = s[18] = s[23] = '-';
//         var uuid = s.join('');
//         return uuid;
//     }
//     createCallbackId() {
//         var id = '<id: ' + (this.callback_id++) + (Math.random()) + '>';
//         return id;
//     }
//     parseCallback(url) {
//         var oauth = new CallbackParser(url, this.responseMode).parseUri();
//         var oauthState = storage.getItem('oauthState');
//         var sessionState = oauthState && JSON.parse(oauthState);
//         if (sessionState && (oauth.code || oauth.error || oauth.access_token || oauth.id_token) && oauth.state && oauth.state == sessionState.state) {
//             storage.removeItem('oauthState');
//             oauth.redirectUri = sessionState.redirectUri;
//             oauth.storedNonce = sessionState.nonce;
//             if (oauth.fragment) {
//                 oauth.newUrl += '#' + oauth.fragment;
//             }
//             return oauth;
//         }
//     }
//     createP_romise() {
//         var p = {
//             setSuccess: function (result) {
//                 p.success = true;
//                 p.result = result;
//                 if (p.successCallback) {
//                     p.successCallback(result);
//                 }
//             },
//             setError: function (result) {
//                 p.error = true;
//                 p.result = result;
//                 if (p.errorCallback) {
//                     p.errorCallback(result);
//                 }
//             },
//             p_romise: {
//                 success: function (callback) {
//                     if (p.success) {
//                         callback(p.result);
//                     } else if (!p.error) {
//                         p.successCallback = callback;
//                     }
//                     return p.p_romise;
//                 },
//                 error: function (callback) {
//                     if (p.error) {
//                         callback(p.result);
//                     } else if (!p.success) {
//                         p.errorCallback = callback;
//                     }
//                     return p.p_romise;
//                 }
//             }
//         }
//         return p;
//     }
//     setupCheckLoginIframe() {
//         var p_romise = createP_romise();
//         if (!loginIframe.enable) {
//             p_romise.setSuccess();
//             return p_romise.p_romise;
//         }
//         if (loginIframe.iframe) {
//             p_romise.setSuccess();
//             return p_romise.p_romise;
//         }
//         var iframe = document.createElement('iframe');
//         loginIframe.iframe = iframe;
//         iframe.onload = function () {
//             var realmUrl = getRealmUrl();
//             if (realmUrl.charAt(0) === '/') {
//                 loginIframe.iframeOrigin = getOrigin();
//             } else {
//                 loginIframe.iframeOrigin = realmUrl.substring(0, realmUrl.indexOf('/', 8));
//             }
//             p_romise.setSuccess();
//             setTimeout(check, loginIframe.interval * 1000);
//         }
//         var src = getRealmUrl() + '/protocol/openid-connect/login-status-iframe.html?client_id=' + encodeURIComponent(this.clientId) + '&origin=' + getOrigin();
//         iframe.setAttribute('src', src);
//         iframe.style.display = 'none';
//         document.body.appendChild(iframe);
//         var messageCallback = function (event) {
//             if (event.origin !== loginIframe.iframeOrigin) {
//                 return;
//             }
//             var data = JSON.parse(event.data);
//             var p_romise = loginIframe.callbackMap[data.callbackId];
//             delete loginIframe.callbackMap[data.callbackId];
//             if ((!this.sessionId || this.sessionId == data.session) && data.loggedIn) {
//                 p_romise.setSuccess();
//             } else {
//                 this.clearToken();
//                 p_romise.setError();
//             }
//         };
//         window.addEventListener('message', messageCallback, false);
//         var check = function () {
//             checkLoginIframe();
//             if (this.token) {
//                 setTimeout(check, loginIframe.interval * 1000);
//             }
//         };
//         return p_romise.p_romise;
//     }
//     checkLoginIframe() {
//         var p_romise = createP_romise();
//         if (loginIframe.iframe && loginIframe.iframeOrigin) {
//             var msg = {};
//             msg.callbackId = createCallbackId();
//             loginIframe.callbackMap[msg.callbackId] = p_romise;
//             var origin = loginIframe.iframeOrigin;
//             loginIframe.iframe.contentWindow.postMessage(JSON.stringify(msg), origin);
//         } else {
//             p_romise.setSuccess();
//         }
//         return p_romise.p_romise;
//     }
//     loadAdapter(type) {
//         if (!type || type == 'default') {
//             return {
//                 login: function (options) {
//                     window.location.href = this.createLoginUrl(options);
//                     return createP_romise().p_romise;
//                 },
//                 logout: function (options) {
//                     window.location.href = this.createLogoutUrl(options);
//                     return createP_romise().p_romise;
//                 },
//                 register: function (options) {
//                     window.location.href = this.createRegisterUrl(options);
//                     return createP_romise().p_romise;
//                 },
//                 accountManagement: function () {
//                     window.location.href = this.createAccountUrl();
//                     return createP_romise().p_romise;
//                 },
//                 redirectUri: function (options, encodeHash) {
//                     if (arguments.length == 1) {
//                         encodeHash = true;
//                     }
//                     if (options && options.redirectUri) {
//                         return options.redirectUri;
//                     } else if (this.redirectUri) {
//                         return this.redirectUri;
//                     } else {
//                         var redirectUri = location.href;
//                         if (location.hash && encodeHash) {
//                             redirectUri = redirectUri.substring(0, location.href.indexOf('#'));
//                             redirectUri += (redirectUri.indexOf('?') == -1 ? '?' : '&') + 'redirect_fragment=' + encodeURIComponent(location.hash.substring(1));
//                         }
//                         return redirectUri;
//                     }
//                 }
//             };
//         }
//         if (type == 'cordova') {
//             loginIframe.enable = false;
//             return {
//                 login: function (options) {
//                     var p_romise = createP_romise();
//                     var o = 'location=no';
//                     if (options && options.prompt == 'none') {
//                         o += ',hidden=yes';
//                     }
//                     var loginUrl = this.createLoginUrl(options);
//                     var ref = window.open(loginUrl, '_blank', o);
//                     var completed = false;
//                     ref.addEventListener('loadstart', function (event) {
//                         if (event.url.indexOf('http://localhost') == 0) {
//                             var callback = parseCallback(event.url);
//                             processCallback(callback, p_romise);
//                             ref.close();
//                             completed = true;
//                         }
//                     });
//                     ref.addEventListener('loaderror', function (event) {
//                         if (!completed) {
//                             if (event.url.indexOf('http://localhost') == 0) {
//                                 var callback = parseCallback(event.url);
//                                 processCallback(callback, p_romise);
//                                 ref.close();
//                                 completed = true;
//                             } else {
//                                 p_romise.setError();
//                                 ref.close();
//                             }
//                         }
//                     });
//                     return p_romise.p_romise;
//                 },
//                 logout: function (options) {
//                     var p_romise = createP_romise();
//                     var logoutUrl = this.createLogoutUrl(options);
//                     var ref = window.open(logoutUrl, '_blank', 'location=no,hidden=yes');
//                     var error;
//                     ref.addEventListener('loadstart', function (event) {
//                         if (event.url.indexOf('http://localhost') == 0) {
//                             ref.close();
//                         }
//                     });
//                     ref.addEventListener('loaderror', function (event) {
//                         if (event.url.indexOf('http://localhost') == 0) {
//                             ref.close();
//                         } else {
//                             error = true;
//                             ref.close();
//                         }
//                     });
//                     ref.addEventListener('exit', function (event) {
//                         if (error) {
//                             p_romise.setError();
//                         } else {
//                             this.clearToken();
//                             p_romise.setSuccess();
//                         }
//                     });
//                     return p_romise.p_romise;
//                 },
//                 register: function () {
//                     var registerUrl = this.createRegisterUrl();
//                     var ref = window.open(registerUrl, '_blank', 'location=no');
//                     ref.addEventListener('loadstart', function (event) {
//                         if (event.url.indexOf('http://localhost') == 0) {
//                             ref.close();
//                         }
//                     });
//                 },
//                 accountManagement: function () {
//                     var accountUrl = this.createAccountUrl();
//                     var ref = window.open(accountUrl, '_blank', 'location=no');
//                     ref.addEventListener('loadstart', function (event) {
//                         if (event.url.indexOf('http://localhost') == 0) {
//                             ref.close();
//                         }
//                     });
//                 },
//                 redirectUri: function (options) {
//                     return 'http://localhost';
//                 }
//             }
//         }
//         throw 'invalid adapter type: ' + type;
//     }

// }
