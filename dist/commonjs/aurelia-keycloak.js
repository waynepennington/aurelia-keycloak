'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;
exports.configure = configure;

var _AuthService = require('./AuthService');

function configure(aurelia, config) {
    var instance = aurelia.container.get(_AuthService.AuthService);
    instance.configure(config);
}

exports.AuthService = _AuthService.AuthService;