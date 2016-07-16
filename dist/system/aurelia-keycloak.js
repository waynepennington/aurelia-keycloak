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
                instance.configure(aurelia, config);
                aurelia.globalResources('authservice');
            }

            _export('configure', configure);
        }
    };
});