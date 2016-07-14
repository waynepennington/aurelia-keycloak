

System.config({
    meta: {
        './keycloak.js': {
            globals: {
                Keycloak: 'keycloak.js'
            }
        }
    }
});
System.import('./keycloak.js');

export var AuthService = function () {
    function AuthService() {
        

        this.keycloak = {};
    }

    AuthService.prototype.configure = function configure(aurelia, config) {
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);
        }
    };

    return AuthService;
}();