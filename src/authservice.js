
export class AuthService { 

    constructor(){
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
    configure(config){
        this.Keycloak = new window.Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.Keycloak.init(config.initOptions);                                     
        }
    }
    installKeycloak(){ 
        return function (src,fOnload){
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = false;
            script.defer = false;
            script.src = `./src/keycloak.js`;
            document.getElementsByTagName('head')[0].appendChild(script); 
        }

    }        
}