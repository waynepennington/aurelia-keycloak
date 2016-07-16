'use strict';

System.register(['./authservice', '/keycloak'], function (_export, _context) {
    "use strict";

    var AuthService, Keycloak;
    return {
        setters: [function (_authservice) {
            AuthService = _authservice.AuthService;
        }, function (_keycloak) {
            Keycloak = _keycloak.Keycloak;
        }],
        execute: function () {
            function configure(aurelia, config) {
                var instance = aurelia.container.get(AuthService);
                instance.configure(aurelia, config);
            }

            _export('configure', configure);

            _export('AuthService', AuthService);

            _export('Keycloak', Keycloak);
        }
    };
});