System.config({
  meta: {
    './keycloak.js': {
      globals: {
        Keycloak: 'keycloak.js'
      }
    }
  }
});
System.import('./keycloak.js');

export class AuthService { 
    constructor(){
        this.keycloak = {};
    }
    configure(aurelia, config){
        this.keycloak = new Keycloak(config.install);
        if (typeof config.initOptions !== 'undefined') {
            this.keycloak.init(config.initOptions);                                  
        }
    }
    
}
