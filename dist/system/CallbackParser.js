"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var CallbackParser;

    

    return {
        setters: [],
        execute: function () {
            _export("CallbackParser", CallbackParser = function CallbackParser(uriToParse, responseMode) {
                

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
            });

            _export("CallbackParser", CallbackParser);
        }
    };
});