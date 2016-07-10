import { AuthService } from './authservice';

export function configure(aurelia, config) {
    var instance = aurelia.container.get(AuthService);
    instance.configure(config);
}
export { AuthService };