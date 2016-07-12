import {AuthService} from './aurelia-keycloak';

export function configure(aurelia, config) {
    let instance = aurelia.container.get(AuthService);
    instance.configure(config);
    console.log('INFO AuthService configured'); 
    aurelia.globalResources('./aurelia-keycloak');
}

export {AuthService}