define(['exports', './authservice'], function (exports, _authservice) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(aurelia, config) {
        var instance = aurelia.container.get(_authservice.AuthService);
        instance.configure(config);
        aurelia.globalResources('./aurelia-keycloak');
    }
});