'use strict';

System.register(['/keycloak'], function (_export, _context) {
    "use strict";

    var keycloak;
    return {
        setters: [function (_keycloak) {
            keycloak = _keycloak.keycloak;
        }],
        execute: function () {
            function configure(aurelia, config) {
                var instance = new Keycloak(config.install);
                if (typeof config.initOption !== 'undefined') {
                    instance.init(config.initOptions);
                }
            }

            _export('configure', configure);

            _export('keycloak', keycloak);
        }
    };
});