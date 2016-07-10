import {AuthService} from './authservice';

//var authservice;
export function configure(aurelia, config) {
    let instance = aurelia.container.get(AuthService);
    instance.configure(config);
}
export {AuthService}
