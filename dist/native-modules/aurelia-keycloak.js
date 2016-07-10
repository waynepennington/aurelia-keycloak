import { keycloak } from '/keycloak';

export function configure(aurelia, config) {
    var instance = new Keycloak(config.install);
    if (typeof config.initOption !== 'undefined') {
        instance.init(config.initOptions);
    }
}
export { keycloak };