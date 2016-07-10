'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Keycloak = undefined;
exports.configure = configure;

var _keycloak = require('./keycloak');

function configure(aurelia, config) {
    var instance = aurelia.container.get(_keycloak.Keycloak);
    instance(config.install);
    if (typeof config.initOption !== 'undefined') {
        instance.init(config.initOptions);
    }
}
exports.Keycloak = _keycloak.Keycloak;