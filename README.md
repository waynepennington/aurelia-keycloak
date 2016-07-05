# Aurelia-Keycloak

An authentication plugin based on KeyCloak ('keycloak.org') for Aurelia applications.

## Get Started

* Install Aurelia-Keycloak

```bash
jspm install aurelia-keycloak
```

* Add plugin to your app's main.js:

```javascript
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-keycloak', (keycloak) => {
            keycloak
        };

    aurelia.start().then(a => a.setRoot());
}
```


**Using with your ViewModel:**

```javascript
import {inject} from 'aurelia-framework';
import {Keycloak} from 'aurelia-keycloak';

@inject(Keycloak)
export class ViewModel {
    constructor(keycloak) {
        keycloak.FUNCTION ... ;

            }
}
```


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




[badge-npm-image]: https://img.shields.io/npm/v/aurelia-configuration.svg?style=flat-square
[badge-npm-ref]: https://www.npmjs.com/package/aurelia-configuration
[badge-gitter-image]: https://badges.gitter.im/Vheissu/Aurelia-Configuration.svg
[badge-gitter-ref]: https://gitter.im/Vheissu/Aurelia-Configuration?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

