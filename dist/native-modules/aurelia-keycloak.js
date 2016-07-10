import { AuthService } from '/AuthService';

export function configure(aurelia, config) {
    var instance = aurelia.container.get(AuthService);
    instance(config);
}