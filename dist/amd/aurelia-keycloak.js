define(['exports', './AuthService'], function (exports, _AuthService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AuthService = undefined;
    exports.configure = configure;
    function configure(aurelia, config) {
        var instance = aurelia.container.get(_AuthService.AuthService);
        instance.configure(config);
        console.log('INFO AuthService configured');
        aurelia.globalResources('./aurelia-keycloak');
    }

    exports.AuthService = _AuthService.AuthService;
});