export function configure(aurelia, config) {
    let instance = aurelia.container.get(AuthService);
    instance.configure(config);
    aurelia.globalResources('./aurelia-keycloak');
}
export let AuthService = class AuthService {

    constructor() {
        this.Keycloak = importKeycloak();
    }
    configure(config) {
        this.Keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    }
    importKeycloak() {
        return function () {
            let script = document.createElement('script');

            script.type = 'text/javascript';
            script.async = false;
            script.defer = false;
            script.src = `./src/keycloak.js`;

            document.body.appendChild(script);
        };
    }
};