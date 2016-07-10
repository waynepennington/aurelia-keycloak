'use strict';

System.register(['./keycloak'], function (_export, _context) {
    "use strict";

    var Keycloak;
    return {
        setters: [function (_keycloak) {
            Keycloak = _keycloak.Keycloak;
        }],
        execute: function () {
            function configure(aurelia, config) {
                var instance = aurelia.container.get(Keycloak);
                instance(config.install);
                if (typeof config.initOption !== 'undefined') {
                    instance.init(config.initOptions);
                }
            }

            _export('configure', configure);

            _export('Keycloak', Keycloak);
        }
    };
});