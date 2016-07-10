

import { keycloak } from './keycloak';
import { noView } from 'aurelia-framework';

export var AuthService = function () {
    function AuthService() {
        
    }

    AuthService.prototype.configure = function configure(config) {
        var installURL;
        if (typeof config.install == 'undefined') {
            installURL = 'keycloak.json';
        } else {
            installURL = config.install;
        }
        var keycloak = new Keycloak(installURL);

        if (typeof config.initOption !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();