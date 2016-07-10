'use strict';

System.register(['/AuthService'], function (_export, _context) {
    "use strict";

    var AuthService;
    return {
        setters: [function (_AuthService) {
            AuthService = _AuthService.AuthService;
        }],
        execute: function () {
            function configure(aurelia, config) {
                var instance = aurelia.container.get(AuthService);
                instance(config);
            }

            _export('configure', configure);

            _export('AuthService', AuthService);
        }
    };
});