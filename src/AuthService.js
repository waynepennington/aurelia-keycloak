import {keycloak} from './keycloak';

export class AuthService { 
    constructor(){
        this.Keycloak = null;
        // this.loadKeycloakScript();
    }
    configure(config){
        
        // Keycloak = window.Keycloak;
        // if (window.Keycloak === undefined){
        //     console.log('window.Keycloak not defined');
        //     }
        //     else{
        //     console.log('window.Keycloak is defined');
        //     }
        // console.log('INFO keycloak.js API loaded');
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
}