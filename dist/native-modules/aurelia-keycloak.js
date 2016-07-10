import { keycloak } from './keycloak';

export function configure(aurelia, config) {
    var instance = aurelia.container.get(Keycloak);
    instance(config.install);
    if (typeof config.initOption !== 'undefined') {
        instance.init(config.initOptions);
    }
}
export { keycloak };