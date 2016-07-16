import { AuthService } from './authservice';
import { Keycloak } from '/keycloak';

export function configure(aurelia, config) {
    var instance = aurelia.container.get(AuthService);
    instance.configure(aurelia, config);
}
export { AuthService };
export { Keycloak };