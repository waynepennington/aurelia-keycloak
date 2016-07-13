

export var AuthService = function () {
    function AuthService() {
        

        this.Keycloak;
        System.config({
            meta: {
                '/src/keycloak.js': {
                    exports: 'Keycloak',
                    format: 'global'
                }
            }
        });
        System.import('/src/keycloak.js');
    }

    AuthService.prototype.configure = function configure(config) {
        this.Keycloak = new window.Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);
        }
    };

    AuthService.prototype.installKeycloak = function installKeycloak() {
        return function (src, fOnload) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = false;
            script.defer = false;
            script.src = './src/keycloak.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        };
    };

    return AuthService;
}();