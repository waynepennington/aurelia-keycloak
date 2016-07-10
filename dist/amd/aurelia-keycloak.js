define(['exports', './keycloak'], function (exports, _keycloak) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.keycloak = undefined;
    exports.configure = configure;
    function configure(aurelia, config) {
        var instance = aurelia.container.get(_keycloak.keycloak);
        instance(config.install);
        if (typeof config.initOption !== 'undefined') {
            instance.init(config.initOptions);
        }
    }
    exports.keycloak = _keycloak.keycloak;
});