'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var AuthService;

    

    return {
        setters: [],
        execute: function () {
            _export('AuthService', AuthService = function () {
                function AuthService() {
                    

                    this.Keycloak;
                }

                AuthService.prototype.configure = function configure(config) {
                    System.config({
                        meta: {
                            '/src/keycloak.js': {
                                exports: 'Keycloak',
                                format: 'global'
                            }
                        }
                    });
                    System.import('/src/keycloak.js');

                    this.Keycloak = new Keycloak(config.install);
                    if (typeof config.initOptions !== 'undefined') {
                        this.Keycloak.init(config.initOptions);
                    }
                };

                AuthService.prototype.installKeycloak = function installKeycloak() {
                    return function (src, fOnload) {
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.async = false;
                        script.defer = false;
                        script.src = './src/keycloak.js';
                        document.getElementsByTagName('head')[0].appendChild(script);
                    };
                };

                return AuthService;
            }());

            _export('AuthService', AuthService);
        }
    };
});