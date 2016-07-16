'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _PersistentStorage = require('./PersistentStorage');

var _CallbackParser = require('./CallbackParser');

var _aureliaFramework = require('aurelia-framework');



var AuthService = exports.AuthService = function () {
    function AuthService() {
        

        kc = this;
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

    AuthService.prototype.configure = function configure(configKC) {
        this.config = configthis.install;
        if (typeof configthis.initOptions !== 'undefined') {
            this.init(configthis.initOptions);
        }
    };

    AuthService.prototype.init = function init(initOptions) {
        kc.authenticated = false;
        storage = new _PersistentStorage.PersistentStorage();
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
                kc.loginRequired = true;
            }
            if (initOptions.responseMode) {
                if (initOptions.responseMode === 'query' || initOptions.responseMode === 'fragment') {
                    kc.responseMode = initOptions.responseMode;
                } else {
                    throw 'Invalid value for responseMode';
                }
            }
            if (initOptions.flow) {
                switch (initOptions.flow) {
                    case 'standard':
                        kc.responseType = 'code';
                        break;
                    case 'implicit':
                        kc.responseType = 'id_token token';
                        break;
                    case 'hybrid':
                        kc.responseType = 'code id_token token';
                        break;
                    default:
                        throw 'Invalid value for flow';
                }
                kc.flow = initOptions.flow;
            }
        }
        if (!kc.responseMode) {
            kc.responseMode = 'fragment';
        }
        if (!kc.responseType) {
            kc.responseType = 'code';
            kc.flow = 'standard';
        }
        var p_romise = createP_romise();
        var initP_romise = createP_romise();
        initP_romise.p_romise.success(function () {
            kc.onReady && kc.onReady(kc.authenticated);
            p_romise.setSuccess(kc.authenticated);
        }).error(function () {
            p_romise.setError();
        });
        var configP_romise = loadConfig(config);
        function onLoad() {
            var doLogin = function doLogin(prompt) {
                if (!prompt) {
                    options.prompt = 'none';
                }
                kc.login(options).success(function () {
                    initP_romise.setSuccess();
                }).error(function () {
                    initP_romise.setError();
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
                                initP_romise.setSuccess();
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
                processCallback(callback, initP_romise);
                return;
            } else if (initOptions) {
                if (initOptions.token || initOptions.refreshToken) {
                    setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken, false);
                    kc.timeSkew = initOptions.timeSkew || 0;
                    if (loginIframe.enable) {
                        setupCheckLoginIframe().success(function () {
                            checkLoginIframe().success(function () {
                                initP_romise.setSuccess();
                            }).error(function () {
                                if (initOptions.onLoad) {
                                    onLoad();
                                }
                            });
                        });
                    } else {
                        initP_romise.setSuccess();
                    }
                } else if (initOptions.onLoad) {
                    onLoad();
                } else {
                    initP_romise.setSuccess();
                }
            } else {
                initP_romise.setSuccess();
            }
        }
        configP_romise.success(processInit);
        configP_romise.error(function () {
            p_romise.setError();
        });
        return p_romise.p_romise;
    };

    AuthService.prototype.login = function login(options) {
        return adapter.login(options);
    };

    AuthService.prototype.createLoginUrl = function createLoginUrl(options) {
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
        var url = getRealmUrl() + '/protocol/openid-connect/' + action + '?client_id=' + encodeURIComponent(kc.clientId) + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&state=' + encodeURIComponent(state) + '&nonce=' + encodeURIComponent(nonce) + '&response_mode=' + encodeURIComponent(kc.responseMode) + '&response_type=' + encodeURIComponent(kc.responseType);
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
        return adapter.logout(options);
    };

    AuthService.prototype.createLogoutUrl = function createLogoutUrl(options) {
        var url = getRealmUrl() + '/protocol/openid-connect/logout' + '?redirect_uri=' + encodeURIComponent(adapter.redirectUri(options, false));
        return url;
    };

    AuthService.prototype.register = function register(options) {
        return adapter.register(options);
    };

    AuthService.prototype.createRegisterUrl = function createRegisterUrl(options) {
        if (!options) {
            options = {};
        }
        options.action = 'register';
        return kc.createLoginUrl(options);
    };

    AuthService.prototype.createAccountUrl = function createAccountUrl(options) {
        var url = getRealmUrl() + '/account' + '?referrer=' + encodeURIComponent(kc.clientId) + '&referrer_uri=' + encodeURIComponent(adapter.redirectUri(options));
        return url;
    };

    AuthService.prototype.accountManagement = function accountManagement() {
        return adapter.accountManagement();
    };

    AuthService.prototype.hasRealmRole = function hasRealmRole(role) {
        var access = kc.realmAccess;
        return !!access && access.roles.indexOf(role) >= 0;
    };

    AuthService.prototype.hasResourceRole = function hasResourceRole(role, resource) {
        if (!kc.resourceAccess) {
            return false;
        }
        var access = kc.resourceAccess[resource || kc.clientId];
        return !!access && access.roles.indexOf(role) >= 0;
    };

    AuthService.prototype.loadUserProfile = function loadUserProfile() {
        var url = getRealmUrl() + '/account';
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Authorization', 'bearer ' + kc.token);
        var p_romise = createP_romise();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    kc.profile = JSON.parse(req.responseText);
                    p_romise.setSuccess(kc.profile);
                } else {
                    p_romise.setError();
                }
            }
        };
        req.send();
        return p_romise.p_romise;
    };

    AuthService.prototype.loadUserInfo = function loadUserInfo() {
        var url = getRealmUrl() + '/protocol/openid-connect/userinfo';
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Authorization', 'bearer ' + kc.token);
        var p_romise = createP_romise();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    kc.userInfo = JSON.parse(req.responseText);
                    p_romise.setSuccess(kc.userInfo);
                } else {
                    p_romise.setError();
                }
            }
        };
        req.send();
        return p_romise.p_romise;
    };

    AuthService.prototype.isTokenExpired = function isTokenExpired(minValidity) {
        if (!kc.tokenParsed || !kc.refreshToken && kc.flow != 'implicit') {
            throw 'Not authenticated';
        }
        var expiresIn = kc.tokenParsed['exp'] - new Date().getTime() / 1000 + kc.timeSkew;
        if (minValidity) {
            expiresIn -= minValidity;
        }
        return expiresIn < 0;
    };

    AuthService.prototype.updateToken = function updateToken(minValidity) {
        var p_romise = createP_romise();
        if (!kc.tokenParsed || !kc.refreshToken) {
            p_romise.setError();
            return p_romise.p_romise;
        }
        minValidity = minValidity || 5;
        var exec = function exec() {
            if (!kc.isTokenExpired(minValidity)) {
                p_romise.setSuccess(false);
            } else {
                var params = 'grant_type=refresh_token&' + 'refresh_token=' + kc.refreshToken;
                var url = getRealmUrl() + '/protocol/openid-connect/token';
                refreshQueue.push(p_romise);
                if (refreshQueue.length == 1) {
                    var req = new XMLHttpRequest();
                    req.open('POST', url, true);
                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    if (kc.clientId && kc.clientSecret) {
                        req.setRequestHeader('Authorization', 'Basic ' + btoa(kc.clientId + ':' + kc.clientSecret));
                    } else {
                        params += '&client_id=' + encodeURIComponent(kc.clientId);
                    }
                    var timeLocal = new Date().getTime();
                    req.onreadystatechange = function () {
                        if (req.readyState == 4) {
                            if (req.status == 200) {
                                timeLocal = (timeLocal + new Date().getTime()) / 2;
                                var tokenResponse = JSON.parse(req.responseText);
                                setToken(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], true);
                                kc.timeSkew = Math.floor(timeLocal / 1000) - kc.tokenParsed.iat;
                                kc.onAuthRefreshSuccess && kc.onAuthRefreshSuccess();
                                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                                    p.setSuccess(true);
                                }
                            } else {
                                kc.onAuthRefreshError && kc.onAuthRefreshError();
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
            var iframeP_romise = checkLoginIframe();
            iframeP_romise.success(function () {
                exec();
            }).error(function () {
                p_romise.setError();
            });
        } else {
            exec();
        }
        return p_romise.p_romise;
    };

    AuthService.prototype.clearToken = function clearToken() {
        if (kc.token) {
            setToken(null, null, null, true);
            kc.onAuthLogout && kc.onAuthLogout();
            if (kc.loginRequired) {
                kc.login();
            }
        }
    };

    AuthService.prototype.getRealmUrl = function getRealmUrl() {
        if (kc.authServerUrl.charAt(kc.authServerUrl.length - 1) == '/') {
            return kc.authServerUrl + 'realms/' + encodeURIComponent(kc.realm);
        } else {
            return kc.authServerUrl + '/realms/' + encodeURIComponent(kc.realm);
        }
    };

    AuthService.prototype.getOrigin = function getOrigin() {
        if (!window.location.origin) {
            return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            return window.location.origin;
        }
    };

    AuthService.prototype.processCallback = function processCallback(oauth, p_romise) {
        var code = oauth.code;
        var error = oauth.error;
        var prompt = oauth.prompt;
        var timeLocal = new Date().getTime();
        if (error) {
            if (prompt != 'none') {
                kc.onAuthError && kc.onAuthError();
                p_romise && p_romise.setError();
            } else {
                p_romise && p_romise.setSuccess();
            }
            return;
        } else if (kc.flow != 'standard' && (oauth.access_token || oauth.id_token)) {
            authSuccess(oauth.access_token, null, oauth.id_token, true);
        }
        if (kc.flow != 'implicit' && code) {
            var params = 'code=' + code + '&grant_type=authorization_code';
            var url = getRealmUrl() + '/protocol/openid-connect/token';
            var req = new XMLHttpRequest();
            req.open('POST', url, true);
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            if (kc.clientId && kc.clientSecret) {
                req.setRequestHeader('Authorization', 'Basic ' + btoa(kc.clientId + ':' + kc.clientSecret));
            } else {
                params += '&client_id=' + encodeURIComponent(kc.clientId);
            }
            params += '&redirect_uri=' + oauth.redirectUri;
            req.withCredentials = true;
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        var tokenResponse = JSON.parse(req.responseText);
                        authSuccess(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], kc.flow === 'standard');
                    } else {
                        kc.onAuthError && kc.onAuthError();
                        p_romise && p_romise.setError();
                    }
                }
            };
            req.send(params);
        }
        function authSuccess(accessToken, refreshToken, idToken, fulfillP_romise) {
            timeLocal = (timeLocal + new Date().getTime()) / 2;
            setToken(accessToken, refreshToken, idToken, true);
            if (kc.tokenParsed && kc.tokenParsed.nonce != oauth.storedNonce || kc.refreshTokenParsed && kc.refreshTokenParsed.nonce != oauth.storedNonce || kc.idTokenParsed && kc.idTokenParsed.nonce != oauth.storedNonce) {
                console.log('invalid nonce!');
                kc.clearToken();
                p_romise && p_romise.setError();
            } else {
                kc.timeSkew = Math.floor(timeLocal / 1000) - kc.tokenParsed.iat;
                if (fulfillP_romise) {
                    kc.onAuthSuccess && kc.onAuthSuccess();
                    p_romise && p_romise.setSuccess();
                }
            }
        }
    };

    AuthService.prototype.loadConfig = function loadConfig(url) {
        var p_romise = createP_romise();
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
                        kc.authServerUrl = config['auth-server-url'];
                        kc.realm = config['realm'];
                        kc.clientId = config['resource'];
                        kc.clientSecret = (config['credentials'] || {})['secret'];
                        p_romise.setSuccess();
                    } else {
                        p_romise.setError();
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
            kc.authServerUrl = config.url;
            kc.realm = config.realm;
            kc.clientId = config.clientId;
            kc.clientSecret = (config.credentials || {}).secret;
            p_romise.setSuccess();
        }
        return p_romise.p_romise;
    };

    AuthService.prototype.setToken = function setToken(token, refreshToken, idToken, useTokenTime) {
        if (kc.tokenTimeoutHandle) {
            clearTimeout(kc.tokenTimeoutHandle);
            kc.tokenTimeoutHandle = null;
        }
        if (token) {
            kc.token = token;
            kc.tokenParsed = decodeToken(token);
            var sessionId = kc.realm + '/' + kc.tokenParsed.sub;
            if (kc.tokenParsed.session_state) {
                sessionId = sessionId + '/' + kc.tokenParsed.session_state;
            }
            kc.sessionId = sessionId;
            kc.authenticated = true;
            kc.subject = kc.tokenParsed.sub;
            kc.realmAccess = kc.tokenParsed.realm_access;
            kc.resourceAccess = kc.tokenParsed.resource_access;
            if (kc.onTokenExpired) {
                var start = useTokenTime ? kc.tokenParsed.iat : new Date().getTime() / 1000;
                var expiresIn = kc.tokenParsed.exp - start;
                kc.tokenTimeoutHandle = setTimeout(kc.onTokenExpired, expiresIn * 1000);
            }
        } else {
            delete kc.token;
            delete kc.tokenParsed;
            delete kc.subject;
            delete kc.realmAccess;
            delete kc.resourceAccess;
            kc.authenticated = false;
        }
        if (refreshToken) {
            kc.refreshToken = refreshToken;
            kc.refreshTokenParsed = decodeToken(refreshToken);
        } else {
            delete kc.refreshToken;
            delete kc.refreshTokenParsed;
        }
        if (idToken) {
            kc.idToken = idToken;
            kc.idTokenParsed = decodeToken(idToken);
        } else {
            delete kc.idToken;
            delete kc.idTokenParsed;
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
        var id = '<id: ' + kc.callback_id++ + Math.random() + '>';
        return id;
    };

    AuthService.prototype.parseCallback = function parseCallback(url) {
        var oauth = new _CallbackParser.CallbackParser(url, kc.responseMode).parseUri();
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

    AuthService.prototype.createP_romise = function createP_romise() {
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
            p_romise: {
                success: function success(callback) {
                    if (p.success) {
                        callback(p.result);
                    } else if (!p.error) {
                        p.successCallback = callback;
                    }
                    return p.p_romise;
                },
                error: function error(callback) {
                    if (p.error) {
                        callback(p.result);
                    } else if (!p.success) {
                        p.errorCallback = callback;
                    }
                    return p.p_romise;
                }
            }
        };
        return p;
    };

    AuthService.prototype.setupCheckLoginIframe = function setupCheckLoginIframe() {
        var p_romise = createP_romise();
        if (!loginIframe.enable) {
            p_romise.setSuccess();
            return p_romise.p_romise;
        }
        if (loginIframe.iframe) {
            p_romise.setSuccess();
            return p_romise.p_romise;
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
            p_romise.setSuccess();
            setTimeout(check, loginIframe.interval * 1000);
        };
        var src = getRealmUrl() + '/protocol/openid-connect/login-status-iframe.html?client_id=' + encodeURIComponent(kc.clientId) + '&origin=' + getOrigin();
        iframe.setAttribute('src', src);
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        var messageCallback = function messageCallback(event) {
            if (event.origin !== loginIframe.iframeOrigin) {
                return;
            }
            var data = JSON.parse(event.data);
            var p_romise = loginIframe.callbackMap[data.callbackId];
            delete loginIframe.callbackMap[data.callbackId];
            if ((!kc.sessionId || kc.sessionId == data.session) && data.loggedIn) {
                p_romise.setSuccess();
            } else {
                kc.clearToken();
                p_romise.setError();
            }
        };
        window.addEventListener('message', messageCallback, false);
        var check = function check() {
            checkLoginIframe();
            if (kc.token) {
                setTimeout(check, loginIframe.interval * 1000);
            }
        };
        return p_romise.p_romise;
    };

    AuthService.prototype.checkLoginIframe = function checkLoginIframe() {
        var p_romise = createP_romise();
        if (loginIframe.iframe && loginIframe.iframeOrigin) {
            var msg = {};
            msg.callbackId = createCallbackId();
            loginIframe.callbackMap[msg.callbackId] = p_romise;
            var origin = loginIframe.iframeOrigin;
            loginIframe.iframe.contentWindow.postMessage(JSON.stringify(msg), origin);
        } else {
            p_romise.setSuccess();
        }
        return p_romise.p_romise;
    };

    AuthService.prototype.loadAdapter = function loadAdapter(type) {
        if (!type || type == 'default') {
            return {
                login: function login(options) {
                    window.location.href = kc.createLoginUrl(options);
                    return createP_romise().p_romise;
                },
                logout: function logout(options) {
                    window.location.href = kc.createLogoutUrl(options);
                    return createP_romise().p_romise;
                },
                register: function register(options) {
                    window.location.href = kc.createRegisterUrl(options);
                    return createP_romise().p_romise;
                },
                accountManagement: function accountManagement() {
                    window.location.href = kc.createAccountUrl();
                    return createP_romise().p_romise;
                },
                redirectUri: function redirectUri(options, encodeHash) {
                    if (arguments.length == 1) {
                        encodeHash = true;
                    }
                    if (options && options.redirectUri) {
                        return options.redirectUri;
                    } else if (kc.redirectUri) {
                        return kc.redirectUri;
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
                    var p_romise = createP_romise();
                    var o = 'location=no';
                    if (options && options.prompt == 'none') {
                        o += ',hidden=yes';
                    }
                    var loginUrl = kc.createLoginUrl(options);
                    var ref = window.open(loginUrl, '_blank', o);
                    var completed = false;
                    ref.addEventListener('loadstart', function (event) {
                        if (event.url.indexOf('http://localhost') == 0) {
                            var callback = parseCallback(event.url);
                            processCallback(callback, p_romise);
                            ref.close();
                            completed = true;
                        }
                    });
                    ref.addEventListener('loaderror', function (event) {
                        if (!completed) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                var callback = parseCallback(event.url);
                                processCallback(callback, p_romise);
                                ref.close();
                                completed = true;
                            } else {
                                p_romise.setError();
                                ref.close();
                            }
                        }
                    });
                    return p_romise.p_romise;
                },
                logout: function logout(options) {
                    var p_romise = createP_romise();
                    var logoutUrl = kc.createLogoutUrl(options);
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
                            p_romise.setError();
                        } else {
                            kc.clearToken();
                            p_romise.setSuccess();
                        }
                    });
                    return p_romise.p_romise;
                },
                register: function register() {
                    var registerUrl = kc.createRegisterUrl();
                    var ref = window.open(registerUrl, '_blank', 'location=no');
                    ref.addEventListener('loadstart', function (event) {
                        if (event.url.indexOf('http://localhost') == 0) {
                            ref.close();
                        }
                    });
                },
                accountManagement: function accountManagement() {
                    var accountUrl = kc.createAccountUrl();
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
}();