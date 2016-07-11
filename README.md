# Aurelia-Keycloak

DO NOT USE.  THIS PLUGIN IS UNDER INITIAL DEVELOPMENT. 

An authentication plugin based on KeyCloak ('keycloak.org') for Aurelia applications.

## Get Started

* Install Aurelia-Keycloak:
For now and until this plugin is registered with jspm, install this way.
```bash
jspm install github:waynepennington/aurelia-keycloak
```
Copy aurelia-keycloak.js (from this GITHUB /dist directory) to your application's ../jspm_packages/github/waynepennington/ directory.
Rename this copied file 'aurelia-keycloak@master.js'

* Add keycloak configuration:
Follow Keycloak directions for creating a keycloak.json configuration file.  Put this file in the same directory as your application's index.html file.

* Add plugin to your app's main.js:
This example will immediately cause the login screen to appear.   
```javascript
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('waynepennington/aurelia-keycloak', (keycloak)=>  keycloak.init({ onLoad: 'login-required' }))
        };

    aurelia.start().then(a => a.setRoot());
}
```

To defer login, use the following:
```javascript
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('waynepennington/aurelia-keycloak')
        };

    aurelia.start().then(a => a.setRoot());
}
```
Then, construct a login button within your code to call the keycloak login function.

**Using with your ViewModel:**

```javascript
import {inject} from 'aurelia-framework';
import {Keycloak} from 'waynepennington/aurelia-keycloak';

@inject(Keycloak)
export class ViewModel {
    constructor(keycloak) {
        keycloak.FUNCTION ... ;

            }
}
```
See keycloak API and the example js-console for the many examples using its functionality.

## API


### item xxx


## Dependencies

* [aurelia-dependency-injection](https://github.com/aurelia/dependency-injection)


## Building from src

To build this plugin from the source, follow these steps.

* Ensure that you have [Node.js](http://nodejs.org) installed. This is what our tooling will depend on to compile the plugin.

* Inside of the project folder, execute the following command:

```shell
npm install
```

* Ensure that you have Gulp installed globally, using the following command:

```shell
npm install -g gulp
```

* Ensure that you have JSPM installed globally, using the following command:

```shell
npm install -g jspm
```

* To build the plugin, run:

```shell
gulp build
```

* You will then find the compiled code in the 'dist' folder, in three different module formats: AMD, CommonJS and ES6.

## Running The Tests

To run the unit tests (there are none currently), please make sure you follow the above steps and then follow each step below to get the testing environment setup.

* Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If it is not installed, then install it using the following command:

  ```shell
  npm install -g karma-cli
  ```

* Install the client-side dependencies with JSPM:

  ```shell
  jspm install
  ```
* You can now run the tests with this command:

  ```shell
  karma start
  ```
