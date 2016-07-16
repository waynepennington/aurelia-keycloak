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