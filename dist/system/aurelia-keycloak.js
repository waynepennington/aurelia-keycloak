'use strict';

System.register(['./authservice'], function (_export, _context) {
    "use strict";

    var AuthService;
    return {
        setters: [function (_authservice) {
            AuthService = _authservice.AuthService;
        }],
        execute: function () {
            function configure(aurelia, config) {
                var instance = aurelia.container.get(AuthService);
                instance.configure(config);
            }

            _export('configure', configure);

            _export('AuthService', AuthService);
        }
    };
});