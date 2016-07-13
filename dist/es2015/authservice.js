
export let AuthService = class AuthService {

    constructor() {
        this.Keycloak;
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.defer = false;
        script.src = `./src/keycloak.js`;
        document.body.appendChild(script);
    }
    configure(config) {
        this.Keycloak = new window.Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
    importKeycloak() {}
};