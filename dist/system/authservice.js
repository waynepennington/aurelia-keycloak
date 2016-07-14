'use strict';

System.register(['./PersistentStorage'], function (_export, _context) {
    "use strict";

    var PersistentStorage, AuthService;

    

    return {
        setters: [function (_PersistentStorage) {
            PersistentStorage = _PersistentStorage.PersistentStorage;
        }],
        execute: function () {
            _export('AuthService', AuthService = function () {
                function AuthService() {
                    

                    this.authenticated = false;
                    this.config;
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

                AuthService.prototype.configure = function configure(aurelia, configKC) {
                    this.config = configKC.install;
                    if (typeof configKC.initOptions !== 'undefined') {
                        this.init(configKC.initOptions);
                    }
                };

                AuthService.prototype.init = function init(initOptions) {
                    this.storage = new PersistentStorage();

                    if (initOptions && initOptions.adapter === 'cordova') {
                        this.adapter = loadAdapter('cordova');
                    } else if (initOptions && initOptions.adapter === 'default') {
                        adapter = loadAdapter();
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
                    initPromise.promise.success(function () {
                        this.onReady && this.onReady(this.authenticated);
                        promise.setSuccess(this.authenticated);
                    }).error(function () {
                        promise.setError();
                    });

                    var configPromise = loadConfig(this.config);

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
                                if (this.loginIframe.enable) {
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

                                if (this.loginIframe.enable) {
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

                AuthService.prototype.login = function login(options) {
                    return this.adapter.login(options);
                };

                AuthService.prototype.createLoginUrl = function createLoginUrl(options) {
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

                AuthService.prototype.logout = function logout(options) {
                    return this.adapter.logout(options);
                };

                AuthService.prototype.createLogoutUrl = function createLogoutUrl(options) {
                    var url = getRealmUrl() + '/protocol/openid-connect/logout' + '?redirect_uri=' + encodeURIComponent(this.adapter.redirectUri(options, false));

                    return url;
                };

                AuthService.prototype.register = function register(options) {
                    return this.adapter.register(options);
                };

                AuthService.prototype.reateRegisterUrl = function reateRegisterUrl(options) {
                    if (!options) {
                        options = {};
                    }
                    options.action = 'register';
                    return this.createLoginUrl(options);
                };

                AuthService.prototype.createAccountUrl = function createAccountUrl(options) {
                    var url = getRealmUrl() + '/account' + '?referrer=' + encodeURIComponent(this.clientId) + '&referrer_uri=' + encodeURIComponent(this.adapter.redirectUri(options));

                    return url;
                };

                AuthService.prototype.accountManagement = function accountManagement() {
                    return this.adapter.accountManagement();
                };

                AuthService.prototype.hasRealmRole = function hasRealmRole(role) {
                    var access = this.realmAccess;
                    return !!access && access.roles.indexOf(role) >= 0;
                };

                AuthService.prototype.hasResourceRole = function hasResourceRole(role, resource) {
                    if (!this.resourceAccess) {
                        return false;
                    }

                    var access = this.resourceAccess[resource || this.clientId];
                    return !!access && access.roles.indexOf(role) >= 0;
                };

                AuthService.prototype.loadUserProfile = function loadUserProfile() {
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

                AuthService.prototype.loadUserInfo = function loadUserInfo() {
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

                AuthService.prototype.isTokenExpired = function isTokenExpired(minValidity) {
                    if (!this.tokenParsed || !this.refreshToken && this.flow != 'implicit') {
                        throw 'Not authenticated';
                    }

                    var expiresIn = this.tokenParsed['exp'] - new Date().getTime() / 1000 + this.timeSkew;
                    if (minValidity) {
                        expiresIn -= minValidity;
                    }

                    return expiresIn < 0;
                };

                AuthService.prototype.updateToken = function updateToken(minValidity) {
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
                    };

                    if (this.loginIframe.enable) {
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

                AuthService.prototype.clearToken = function clearToken() {
                    if (this.token) {
                        setToken(null, null, null, true);
                        this.onAuthLogout && this.onAuthLogout();
                        if (this.loginRequired) {
                            this.login();
                        }
                    }
                };

                AuthService.prototype.getRealmUrl = function getRealmUrl() {
                    if (this.authServerUrl.charAt(this.authServerUrl.length - 1) == '/') {
                        return this.authServerUrl + 'realms/' + encodeURIComponent(this.realm);
                    } else {
                        return this.authServerUrl + '/realms/' + encodeURIComponent(this.realm);
                    }
                };

                AuthService.prototype.getOrigin = function getOrigin() {
                    if (!window.location.origin) {
                        return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                    } else {
                        return window.location.origin;
                    }
                };

                AuthService.prototype.processCallback = function processCallback(oauth, promise) {
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

                AuthService.prototype.loadConfig = function loadConfig(url) {
                    var promise = createPromise();
                    var configUrl;

                    if (!this.config) {
                        configUrl = 'keycloak.json';
                    } else if (typeof this.config === 'string') {
                        configUrl = this.config;
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
                };

                AuthService.prototype.setToken = function setToken(token, refreshToken, idToken, useTokenTime) {
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

                AuthService.prototype.decodeToken = function decodeToken(str) {
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

                AuthService.prototype.createUUID = function createUUID() {
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

                AuthService.prototype.createCallbackId = function createCallbackId() {
                    var id = '<id: ' + this.callback_id++ + Math.random() + '>';
                    return id;
                };

                AuthService.prototype.parseCallback = function parseCallback(url) {
                    var oauth = CallbackParser(url, this.responseMode);

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
                };

                AuthService.prototype.CallbackParser = function CallbackParser(uriToParse, responseMode) {
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

                    var parsedUri = { baseUri: baseUri, queryString: queryString, fragmentString: fragmentString };
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
                            var result = {};
                            var params = parsedUri.fragmentString.split('&');
                            for (var i = 0; i < params.length; i++) {
                                var p = params[i].split('=');
                                var paramName = decodeURIComponent(p[0]);
                                var paramValue = decodeURIComponent(p[1]);
                                result[paramName] = paramValue;
                            }
                            fragmentParams = result;
                        }
                        for (var param in fragmentParams) {
                            oauth[param] = fragmentParams[param];
                        }
                    }
                    return oauth;
                };

                AuthService.prototype.handleQueryParam = function handleQueryParam(paramName, paramValue, oauth) {
                    var supportedOAuthParams = ['code', 'error', 'state'];

                    for (var i = 0; i < supportedOAuthParams.length; i++) {
                        if (paramName === supportedOAuthParams[i]) {
                            oauth[paramName] = paramValue;
                            return true;
                        }
                    }
                    return false;
                };

                AuthService.prototype.createPromise = function createPromise() {
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

                AuthService.prototype.setupCheckLoginIframe = function setupCheckLoginIframe() {
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

                    iframe.onload = function () {
                        var realmUrl = getRealmUrl();
                        if (realmUrl.charAt(0) === '/') {
                            this.loginIframe.iframeOrigin = getOrigin();
                        } else {
                            this.loginIframe.iframeOrigin = realmUrl.substring(0, realmUrl.indexOf('/', 8));
                        }
                        promise.setSuccess();

                        setTimeout(check, this.loginIframe.interval * 1000);
                    };

                    var src = getRealmUrl() + '/protocol/openid-connect/login-status-iframe.html?client_id=' + encodeURIComponent(this.clientId) + '&origin=' + getOrigin();
                    iframe.setAttribute('src', src);
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);

                    var messageCallback = function messageCallback(event) {
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

                    var check = function check() {
                        checkLoginIframe();
                        if (this.token) {
                            setTimeout(check, this.loginIframe.interval * 1000);
                        }
                    };

                    return promise.promise;
                };

                AuthService.prototype.checkLoginIframe = function checkLoginIframe() {
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
                };

                AuthService.prototype.loadAdapter = function loadAdapter(type) {
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
                        this.loginIframe.enable = false;

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

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});