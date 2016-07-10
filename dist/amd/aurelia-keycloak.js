define(['exports', '/AuthService'], function (exports, _AuthService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(aurelia, config) {
        var instance = aurelia.container.get(_AuthService.AuthService);
        instance(config);
    }
});