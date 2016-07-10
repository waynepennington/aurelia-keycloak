import {AuthService} from './authservice';

//var authservice;
export function configure(aurelia, config) {
    let instance = aurelia.container.get(AuthService);
    instance.configure(config);
    
//authservice = new AuthService(config);
//aurelia.globalName('./aurelia-keycloak/aurelia-keycloak','aurelia-keycloak');
//aurelia.container.registerSingleton('AuthService', authservice);
}

export {AuthService}
        
// aurelia.container.registerSingleton('keycloak', Keycloak);
//keycloak(config.install);
//let keycloak = aurelia.container.get(Keycloak);
//export function configure(aurelia, configCallback) {
//            let keycloak = new Keycloak();
//            aurelia.container.registerSingleton('keycloak',keycloak);
//                configCallback(keycloak);
//        }

