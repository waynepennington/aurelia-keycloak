'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = configure;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthService = exports.AuthService = function () {
    function AuthService() {
        _classCallCheck(this, AuthService);

        this.Keycloak;
        importKeycloak();
    }

    AuthService.prototype.configure = function configure(config) {
        this.Keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    AuthService.prototype.importKeycloak = function importKeycloak() {
        return function () {
            var script = document.createElement('script');

            script.type = 'text/javascript';
            script.async = false;
            script.defer = false;
            script.src = './src/keycloak.js';

            document.body.appendChild(script);
        };
    };

    return AuthService;
}();

function configure(aurelia, config) {
    var instance = aurelia.container.get(AuthService);
    instance.configure(config);
    aurelia.globalResources('./aurelia-keycloak');
}