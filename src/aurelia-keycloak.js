import {AuthService} from '/AuthService';

export function configure(aurelia, config) {
    let instance = aurelia.container.get(AuthService);
    instance(config);
}

export {AuthService}
