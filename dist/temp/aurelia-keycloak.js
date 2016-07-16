"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = exports.Keycloak = undefined;

var _class;

var _aureliaFramework = require("aurelia-framework");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CallbackParser = function CallbackParser(uriToParse, responseMode) {
    _classCallCheck(this, CallbackParser);

    var parser = this;
    var initialParse = function initialParse() {
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
    };
    var parseParams = function parseParams(paramString) {
        var result = {};
        var params = paramString.split('&');
        for (var i = 0; i < params.length; i++) {
            var p = params[i].split('=');
            var paramName = decodeURIComponent(p[0]);
            var paramValue = decodeURIComponent(p[1]);
            result[paramName] = paramValue;
        }
        return result;
    };
    var handleQueryParam = function handleQueryParam(paramName, paramValue, oauth) {
        var supportedOAuthParams = ['code', 'error', 'state'];
        for (var i = 0; i < supportedOAuthParams.length; i++) {
            if (paramName === supportedOAuthParams[i]) {
                oauth[paramName] = paramValue;
                return true;
            }
        }
        return false;
    };
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
    };
};

var PersistentStorage = function () {
    function PersistentStorage() {
        _classCallCheck(this, PersistentStorage);

        this.bogusconstructor = null;
    }

    PersistentStorage.prototype.useCookieStorage = function useCookieStorage() {
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

    PersistentStorage.prototype.setitem = function setitem(key, value) {
        if (useCookieStorage()) {
            setCookie(key, value, cookieExpiration(5));
        } else {
            localStorage.setItem(key, value);
        }
    };

    PersistentStorage.prototype.getItem = function getItem(key) {
        if (useCookieStorage()) {
            return getCookie(key);
        }
        return localStorage.getItem(key);
    };

    PersistentStorage.prototype.removeItem = function removeItem(key) {
        if (typeof localStorage !== "undefined") {
            try {
                localStorage.removeItem(key);
            } catch (err) {}
        }

        setCookie(key, '', cookieExpiration(-100));
    };

    PersistentStorage.prototype.cookieExpiration = function cookieExpiration(minutes) {
        exp = new Date();
        exp.setTime(exp.getTime() + minutes * 60 * 1000);
        return exp;
    };

    PersistentStorage.prototype.getCookie = function getCookie(key) {
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

    PersistentStorage.prototype.setCookie = function setCookie(key, value, expirationDate) {
        cookie = key + '=' + value + '; ' + 'expires=' + expirationDate.toUTCString() + '; ';
        document.cookie = cookie;
    };

    return PersistentStorage;
}();

;

var Keycloak = exports.Keycloak = function () {
    function Keycloak(config) {
        _classCallCheck(this, Keycloak);

        this.config = config;
        var adapter;
        var refreshQueue = [];
        var storage;

        var loginIframe = {
            enable: true,
            callbackMap: [],
            interval: 5
        };
        this.callback_id = 0;
    }

    Keycloak.prototype.init = function init(initOptions) {

        this.authenticated = false;

        storage = new PersistentStorage();

        if (initOptions && initOptions.adapter === 'cordova') {
            adapter = loadAdapter('cordova');
        } else if (initOptions && initOptions.adapter === 'default') {
            adapter = loadAdapter();
        } else {
            if (window.Cordova) {
                adapter = loadAdapter('cordova');
            } else {
                adapter = loadAdapter();
            }
        }

        if (initOptions) {
            if (typeof initOptions.checkLoginIframe !== 'undefined') {
                loginIframe.enable = initOptions.checkLoginIframe;
            }

            if (initOptions.checkLoginIframeInterval) {
                loginIframe.interval = initOptions.checkLoginIframeInterval;
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
        initPromise.promise.success(function () {
            this.onReady && this.onReady(this.authenticated);
            promise.setSuccess(this.authenticated);
        }).error(function () {
            promise.setError();
        });

        var configPromise = loadConfig(config);

        function onLoad() {
            var doLogin = function doLogin(prompt) {
                if (!prompt) {
                    options.prompt = 'none';
                }
                this.login(options).success(function () {
                    initPromise.setSuccess();
                }).error(function () {
                    initPromise.setError();
                });
            };

            var options = {};
            switch (initOptions.onLoad) {
                case 'check-sso':
                    if (loginIframe.enable) {
                        setupCheckLoginIframe().success(function () {
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

                    if (loginIframe.enable) {
                        setupCheckLoginIframe().success(function () {
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
        configPromise.error(function () {
            promise.setError();
        });

        return promise.promise;
    };

    Keycloak.prototype.login = function login(options) {
        return adapter.login(options);
    };

    Keycloak.prototype.createLoginUrl = function createLoginUrl(options) {
        var state = createUUID();
        var nonce = createUUID();

        var redirectUri = adapter.redirectUri(options);
        if (options && options.prompt) {
            redirectUri += (redirectUri.indexOf('?') == -1 ? '?' : '&') + 'prompt=' + options.prompt;
        }

        storage.setItem('oauthState', JSON.stringify({ state: state, nonce: nonce, redirectUri: encodeURIComponent(redirectUri) }));

        var action = 'auth';
        if (options && options.action == 'register') {
            action = 'registrations';
        }

        var url = getRealmUrl() + '/protocol/openid-connect/' + action + '?client_id=' + encodeURIComponent(this.clientId) + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&state=' + encodeURIComponent(state) + '&nonce=' + encodeURIComponent(nonce) + '&response_mode=' + encodeURIComponent(this.responseMode) + '&response_type=' + encodeURIComponent(this.responseType);

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
    };

    Keycloak.prototype.logout = function logout(options) {
        return adapter.logout(options);
    };

    Keycloak.prototype.createLogoutUrl = function createLogoutUrl(options) {
        var url = getRealmUrl() + '/protocol/openid-connect/logout' + '?redirect_uri=' + encodeURIComponent(adapter.redirectUri(options, false));

        return url;
    };

    Keycloak.prototype.register = function register(options) {
        return adapter.register(options);
    };

    Keycloak.prototype.createRegisterUrl = function createRegisterUrl(options) {
        if (!options) {
            options = {};
        }
        options.action = 'register';
        return this.createLoginUrl(options);
    };

    Keycloak.prototype.createAccountUrl = function createAccountUrl(options) {
        var url = getRealmUrl() + '/account' + '?referrer=' + encodeURIComponent(this.clientId) + '&referrer_uri=' + encodeURIComponent(adapter.redirectUri(options));

        return url;
    };

    Keycloak.prototype.accountManagement = function accountManagement() {
        return adapter.accountManagement();
    };

    Keycloak.prototype.hasRealmRole = function hasRealmRole(role) {
        var access = this.realmAccess;
        return !!access && access.roles.indexOf(role) >= 0;
    };

    Keycloak.prototype.hasResourceRole = function hasResourceRole(role, resource) {
        if (!this.resourceAccess) {
            return false;
        }

        var access = this.resourceAccess[resource || this.clientId];
        return !!access && access.roles.indexOf(role) >= 0;
    };

    Keycloak.prototype.loadUserProfile = function loadUserProfile() {
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
        };

        req.send();

        return promise.promise;
    };

    Keycloak.prototype.loadUserInfo = function loadUserInfo() {
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
        };

        req.send();

        return promise.promise;
    };

    Keycloak.prototype.isTokenExpired = function isTokenExpired(minValidity) {
        if (!this.tokenParsed || !this.refreshToken && this.flow != 'implicit') {
            throw 'Not authenticated';
        }

        var expiresIn = this.tokenParsed['exp'] - new Date().getTime() / 1000 + this.timeSkew;
        if (minValidity) {
            expiresIn -= minValidity;
        }

        return expiresIn < 0;
    };

    Keycloak.prototype.updateToken = function updateToken(minValidity) {
        var promise = createPromise();

        if (!this.tokenParsed || !this.refreshToken) {
            promise.setError();
            return promise.promise;
        }

        minValidity = minValidity || 5;

        var exec = function exec() {
            if (!this.isTokenExpired(minValidity)) {
                promise.setSuccess(false);
            } else {
                var params = 'grant_type=refresh_token&' + 'refresh_token=' + this.refreshToken;
                var url = getRealmUrl() + '/protocol/openid-connect/token';

                refreshQueue.push(promise);

                if (refreshQueue.length == 1) {
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
                                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                                    p.setSuccess(true);
                                }
                            } else {
                                this.onAuthRefreshError && this.onAuthRefreshError();
                                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                                    p.setError(true);
                                }
                            }
                        }
                    };

                    req.send(params);
                }
            }
        };

        if (loginIframe.enable) {
            var iframePromise = checkLoginIframe();
            iframePromise.success(function () {
                exec();
            }).error(function () {
                promise.setError();
            });
        } else {
            exec();
        }

        return promise.promise;
    };

    Keycloak.prototype.clearToken = function clearToken() {
        if (this.token) {
            setToken(null, null, null, true);
            this.onAuthLogout && this.onAuthLogout();
            if (this.loginRequired) {
                this.login();
            }
        }
    };

    Keycloak.prototype.getRealmUrl = function getRealmUrl() {
        if (this.authServerUrl.charAt(this.authServerUrl.length - 1) == '/') {
            return this.authServerUrl + 'realms/' + encodeURIComponent(this.realm);
        } else {
            return this.authServerUrl + '/realms/' + encodeURIComponent(this.realm);
        }
    };

    Keycloak.prototype.getOrigin = function getOrigin() {
        if (!window.location.origin) {
            return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            return window.location.origin;
        }
    };

    Keycloak.prototype.processCallback = function processCallback(oauth, promise) {
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
        } else if (this.flow != 'standard' && (oauth.access_token || oauth.id_token)) {
            authSuccess(oauth.access_token, null, oauth.id_token, true);
        }

        if (this.flow != 'implicit' && code) {
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

            req.onreadystatechange = function () {
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

            if (this.tokenParsed && this.tokenParsed.nonce != oauth.storedNonce || this.refreshTokenParsed && this.refreshTokenParsed.nonce != oauth.storedNonce || this.idTokenParsed && this.idTokenParsed.nonce != oauth.storedNonce) {

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
    };

    Keycloak.prototype.loadConfig = function loadConfig(url) {
        var promise = createPromise();
        var configUrl;

        if (!config) {
            configUrl = 'keycloak.json';
        } else if (typeof config === 'string') {
            configUrl = config;
        }

        if (configUrl) {
            var req = new XMLHttpRequest();
            req.open('GET', configUrl, true);
            req.setRequestHeader('Accept', 'application/json');

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        var config = JSON.parse(req.responseText);

                        this.authServerUrl = config['auth-server-url'];
                        this.realm = config['realm'];
                        this.clientId = config['resource'];
                        this.clientSecret = (config['credentials'] || {})['secret'];

                        promise.setSuccess();
                    } else {
                        promise.setError();
                    }
                }
            };

            req.send();
        } else {
            if (!config['url']) {
                var scripts = document.getElementsByTagName('script');
                for (var i = 0; i < scripts.length; i++) {
                    if (scripts[i].src.match(/.*keycloak\.js/)) {
                        config.url = scripts[i].src.substr(0, scripts[i].src.indexOf('/js/keycloak.js'));
                        break;
                    }
                }
            }

            if (!config.realm) {
                throw 'realm missing';
            }

            if (!config.clientId) {
                throw 'clientId missing';
            }

            this.authServerUrl = config.url;
            this.realm = config.realm;
            this.clientId = config.clientId;
            this.clientSecret = (config.credentials || {}).secret;

            promise.setSuccess();
        }

        return promise.promise;
    };

    Keycloak.prototype.setToken = function setToken(token, refreshToken, idToken, useTokenTime) {
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
                var start = useTokenTime ? this.tokenParsed.iat : new Date().getTime() / 1000;
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
    };

    Keycloak.prototype.decodeToken = function decodeToken(str) {
        str = str.split('.')[1];

        str = str.replace('/-/g', '+');
        str = str.replace('/_/g', '/');
        switch (str.length % 4) {
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

        str = (str + '===').slice(0, str.length + str.length % 4);
        str = str.replace(/-/g, '+').replace(/_/g, '/');

        str = decodeURIComponent(escape(atob(str)));

        str = JSON.parse(str);
        return str;
    };

    Keycloak.prototype.createUUID = function createUUID() {
        var s = [];
        var hexDigits = '0123456789abcdef';
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4';
        s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        var uuid = s.join('');
        return uuid;
    };

    Keycloak.prototype.createCallbackId = function createCallbackId() {
        var id = '<id: ' + this.callback_id++ + Math.random() + '>';
        return id;
    };

    Keycloak.prototype.parseCallback = function parseCallback(url) {
        var oauth = new CallbackParser(url, this.responseMode).parseUri();

        var oauthState = storage.getItem('oauthState');
        var sessionState = oauthState && JSON.parse(oauthState);

        if (sessionState && (oauth.code || oauth.error || oauth.access_token || oauth.id_token) && oauth.state && oauth.state == sessionState.state) {
            storage.removeItem('oauthState');

            oauth.redirectUri = sessionState.redirectUri;
            oauth.storedNonce = sessionState.nonce;

            if (oauth.fragment) {
                oauth.newUrl += '#' + oauth.fragment;
            }

            return oauth;
        }
    };

    Keycloak.prototype.createPromise = function createPromise() {
        var p = {
            setSuccess: function setSuccess(result) {
                p.success = true;
                p.result = result;
                if (p.successCallback) {
                    p.successCallback(result);
                }
            },

            setError: function setError(result) {
                p.error = true;
                p.result = result;
                if (p.errorCallback) {
                    p.errorCallback(result);
                }
            },

            promise: {
                success: function success(callback) {
                    if (p.success) {
                        callback(p.result);
                    } else if (!p.error) {
                        p.successCallback = callback;
                    }
                    return p.promise;
                },
                error: function error(callback) {
                    if (p.error) {
                        callback(p.result);
                    } else if (!p.success) {
                        p.errorCallback = callback;
                    }
                    return p.promise;
                }
            }
        };
        return p;
    };

    Keycloak.prototype.setupCheckLoginIframe = function setupCheckLoginIframe() {
        var promise = createPromise();

        if (!loginIframe.enable) {
            promise.setSuccess();
            return promise.promise;
        }

        if (loginIframe.iframe) {
            promise.setSuccess();
            return promise.promise;
        }

        var iframe = document.createElement('iframe');
        loginIframe.iframe = iframe;

        iframe.onload = function () {
            var realmUrl = getRealmUrl();
            if (realmUrl.charAt(0) === '/') {
                loginIframe.iframeOrigin = getOrigin();
            } else {
                loginIframe.iframeOrigin = realmUrl.substring(0, realmUrl.indexOf('/', 8));
            }
            promise.setSuccess();

            setTimeout(check, loginIframe.interval * 1000);
        };

        var src = getRealmUrl() + '/protocol/openid-connect/login-status-iframe.html?client_id=' + encodeURIComponent(this.clientId) + '&origin=' + getOrigin();
        iframe.setAttribute('src', src);
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        var messageCallback = function messageCallback(event) {
            if (event.origin !== loginIframe.iframeOrigin) {
                return;
            }
            var data = JSON.parse(event.data);
            var promise = loginIframe.callbackMap[data.callbackId];
            delete loginIframe.callbackMap[data.callbackId];

            if ((!this.sessionId || this.sessionId == data.session) && data.loggedIn) {
                promise.setSuccess();
            } else {
                this.clearToken();
                promise.setError();
            }
        };
        window.addEventListener('message', messageCallback, false);

        var check = function check() {
            checkLoginIframe();
            if (this.token) {
                setTimeout(check, loginIframe.interval * 1000);
            }
        };

        return promise.promise;
    };

    Keycloak.prototype.checkLoginIframe = function checkLoginIframe() {
        var promise = createPromise();

        if (loginIframe.iframe && loginIframe.iframeOrigin) {
            var msg = {};
            msg.callbackId = createCallbackId();
            loginIframe.callbackMap[msg.callbackId] = promise;
            var origin = loginIframe.iframeOrigin;
            loginIframe.iframe.contentWindow.postMessage(JSON.stringify(msg), origin);
        } else {
            promise.setSuccess();
        }

        return promise.promise;
    };

    Keycloak.prototype.loadAdapter = function loadAdapter(type) {
        if (!type || type == 'default') {
            return {
                login: function login(options) {
                    window.location.href = this.createLoginUrl(options);
                    return createPromise().promise;
                },

                logout: function logout(options) {
                    window.location.href = this.createLogoutUrl(options);
                    return createPromise().promise;
                },

                register: function register(options) {
                    window.location.href = this.createRegisterUrl(options);
                    return createPromise().promise;
                },

                accountManagement: function accountManagement() {
                    window.location.href = this.createAccountUrl();
                    return createPromise().promise;
                },

                redirectUri: function redirectUri(options, encodeHash) {
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
            loginIframe.enable = false;

            return {
                login: function login(options) {
                    var promise = createPromise();

                    var o = 'location=no';
                    if (options && options.prompt == 'none') {
                        o += ',hidden=yes';
                    }

                    var loginUrl = this.createLoginUrl(options);
                    var ref = window.open(loginUrl, '_blank', o);

                    var completed = false;

                    ref.addEventListener('loadstart', function (event) {
                        if (event.url.indexOf('http://localhost') == 0) {
                            var callback = parseCallback(event.url);
                            processCallback(callback, promise);
                            ref.close();
                            completed = true;
                        }
                    });

                    ref.addEventListener('loaderror', function (event) {
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

                logout: function logout(options) {
                    var promise = createPromise();

                    var logoutUrl = this.createLogoutUrl(options);
                    var ref = window.open(logoutUrl, '_blank', 'location=no,hidden=yes');

                    var error;

                    ref.addEventListener('loadstart', function (event) {
                        if (event.url.indexOf('http://localhost') == 0) {
                            ref.close();
                        }
                    });

                    ref.addEventListener('loaderror', function (event) {
                        if (event.url.indexOf('http://localhost') == 0) {
                            ref.close();
                        } else {
                            error = true;
                            ref.close();
                        }
                    });

                    ref.addEventListener('exit', function (event) {
                        if (error) {
                            promise.setError();
                        } else {
                            this.clearToken();
                            promise.setSuccess();
                        }
                    });

                    return promise.promise;
                },

                register: function register() {
                    var registerUrl = this.createRegisterUrl();
                    var ref = window.open(registerUrl, '_blank', 'location=no');
                    ref.addEventListener('loadstart', function (event) {
                        if (event.url.indexOf('http://localhost') == 0) {
                            ref.close();
                        }
                    });
                },

                accountManagement: function accountManagement() {
                    var accountUrl = this.createAccountUrl();
                    var ref = window.open(accountUrl, '_blank', 'location=no');
                    ref.addEventListener('loadstart', function (event) {
                        if (event.url.indexOf('http://localhost') == 0) {
                            ref.close();
                        }
                    });
                },

                redirectUri: function redirectUri(options) {
                    return 'http://localhost';
                }
            };
        }

        throw 'invalid adapter type: ' + type;
    };

    return Keycloak;
}();

var AuthService = exports.AuthService = (0, _aureliaFramework.noView)(_class = function () {
    function AuthService() {
        _classCallCheck(this, AuthService);

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(aurelia, config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}()) || _class;