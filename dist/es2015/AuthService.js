export let AuthService = class AuthService {
    constructor() {
        this.Keycloak = null;
    }
    configure(config) {
        this.loadKeycloakScript();

        console.log('INFO window.Keycloak type of ' + typeof window.Keycloak);
        this.Keycloak = new window.Keycloak(config.install);
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
            script.src = './src/keycloak.js';

            document.body.appendChild(script);
        }
    }
};