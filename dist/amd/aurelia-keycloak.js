define(['exports', './authservice'], function (exports, _authservice) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;
    exports.configure = configure;
    function configure(aurelia, config) {
        var instance = aurelia.container.get(_authservice.AuthService);
        instance.configure(aurelia, config);
    }
    exports.AuthService = _authservice.AuthService;
});