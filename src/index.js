import {Keycloak} from './keycloak';

export function configure(aurelia, configCallback) {
  let keycloak = aurelia.container.get(Keycloak);

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
      configCallback(keycloak);
  }
  aurelia.globalResources('./aurelia-keycloak');
}

export {Keycloak}
