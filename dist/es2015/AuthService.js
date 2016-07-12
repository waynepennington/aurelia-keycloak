import { keycloak } from './keycloak';
import { inject } from 'aurelia-framework';

export let AuthService = class AuthService {
    constructor() {
        this.Keycloak = null;
    }
    configure(config) {
        this.Keycloak = new Keycloak(config.install);
        console.log('INFO Keycloak authentication client installation configuration loaded');
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
            console.log('INFO Keycloak initialization options loaded');
            console.log('INFO ' + config.initOptions);
        }
    }
    loadKeycloakScript() {
        if (window.Keycloak === undefined) {
            let script = document.createElement('script');

            script.type = 'text/javascript';
            script.async = false;
            script.defer = false;
            script.src = './jspm_packages/github/waynepennington/aurelia-keycloak@master/keycloak.js';
            document.body.appendChild(script);
        }
    }
};