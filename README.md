# Aurelia-Keycloak

Alpha version.

>An authentication plugin based on [KeyCloak] (http://keycloak.org) for [Aurelia] (http://www.aurelia.io/) applications.

## Important Note
The hidden Keycloak `iframe` that is used to check token update status is turned off by default in this plugin: `checkLoginIframe: false`.  This is to get around a limitation within Aurelia.  This setting requires your code to manually check and/or refresh the token when making API calls.  That is problemmatic.  A solution is being worked.  In addition, built-in REST API fetch functionality using simple configuration settings will be added within the next week.  So stay tuned by subscribing to changes to this site.  If you are interested in other features or wish to contribute, please leave a note.
## Get Started

* Install Aurelia-Keycloak:
```bash
jspm install aurelia-keycloak
```

* Add keycloak configuration and initialization settings:
Follow Keycloak directions for creating a keycloak.json configuration file.  Put this file in the same directory as your application's index.html file. Refer to the keycloak javascript adapter [documentation] (https://keycloak.gitbooks.io) for its initialization options and API.

* Add plugin to your app's main.js:  This example assumes your keycloak.json is in your root directory.  This code will immediately cause the login screen to appear.   
```javascript
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-keycloak', {initOptions:{ onLoad: 'login-required' }})
        };

    aurelia.start().then(a => a.setRoot());
}
```

* To defer login, use the following:
```javascript
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-keycloak')
        };

    aurelia.start().then(a => a.setRoot());
}
```
Then, construct a login button within your code to call the keycloak login function.
* Rather than use a keycloak.json file, you can insert the installation config with the plugin declaration
```javascript
        .plugin('aurelia-keycloak',
        {
            install:
            {
                "realm": "yourrealm",
                "realm-public-key": "MIIBIjOMLD2DhzrohVDQNClzmh5pv1Enr3L/lM9KPExJgb4i6+8cQolMgKkANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjCYoc4FlNRMOYRxqpbBq852Tdm/E7h5Ndc2RQsLyoEHCO0AgVSe6HoNkkch2/UnazBdaHUkt+4krXH9o1fyQKhzqjhZnpycxgUMRuPnfAoXrHrNgR6vvsWf/G7/WMi6v1Kp8Q8v8e6UphetFJmjR87f/+0D10ZKeZNkWX3evQn8Yp2/2JferjxeW0GYsOdBpwJhqIzCKeoS7L+3j5yzdBiap5azjHZCl6tZjfyFHm7pln/i6QS3gvIEK2w+PxqOrDTKVSO4huU4quNCpGZE3PN3Nrjlc0ItYwIDAQAB",
                "auth-server-url": "https://yourkeycloakserver.com/auth",
                "ssl-required": "external",
                "resource": "a_realm_resource",
                "public-client": true
            }
            initOptions:{ onLoad: 'login-required' }
        }
```
* Or, you can just reference wherever the keycloak.json file is located
```javascript
    .plugin('aurelia-keycloak',
    {
        install: "c:/mydirectory/keycloak.jason",
        initOptions:{ onLoad: 'login-required' }
    }
```

**Using with your ViewModel:**

```javascript
import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-keycloak';

@inject(AuthService)
export class ViewModel {
    constructor() {
        this.keycloak = AuthService.keycloak;

            }
}
```
See keycloak API and the example js-console for the many examples using its functionality.

## Example API Usage with Aurelia
**Model**
```javascript
import {AuthService} from 'aurelia-keycloak';

import {inject} from 'aurelia-framework';

@inject(AuthService)
export class Welcome {
    heading = 'Welcome to Aurelia-Keycloak!';
    result = "";
    eventHistory = "";

    constructor() {
        self = this;
        this.keycloak = AuthService.keycloak;
        //set callbacks
        this.keycloak.onAuthSuccess = function () {
            self.eventNotice('Auth Success');
        };
        this.keycloak.onAuthError = function () {
            self.eventNotice('Auth Error');
        };
        this.keycloak.onAuthRefreshSuccess = function () {
            self.eventNotice('Auth Refresh Success');
        };
        this.keycloak.onAuthRefreshError = function () {
            self.eventNotice('Auth Refresh Error');
        };
        this.keycloak.onAuthLogout = function () {
            self.eventNotice('Auth Logout');
        };
        this.keycloak.onTokenExpired = function () {
            self.eventNotice('Access token expired.');
        };
    }
    showResults(data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data, null, '  ');
        }
        this.result = data;
    }
    eventNotice(notice) {
        this.eventHistory = new Date().toLocaleString() + "\t" + notice + "\n" + this.eventHistory;
    }
    loadProfile() {
        this.keycloak.loadUserProfile().success(function (profile) {
            self.showResults(profile);
        }).error(function () {
            self.showResults('Failed to load profile');
        });
    }
    loadUserInfo() {
        this.keycloak.loadUserInfo().success(function (userInfo) {
            self.showResults(userInfo);
        }).error(function () {
            self.showResults('Failed to load user info');
        });
    }
    refreshToken(minValidity) {

        this.keycloak.updateToken(minValidity).success(function (refreshed) {
            if (refreshed) {
                self.showResults(this.keycloak.tokenParsed);
            } else {
                self.showResults('Token not refreshed, valid for ' + Math.round(this.keycloak.tokenParsed.exp + this.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(function () {
            showResults('Failed to refresh token');
        });

    }
    showExpires() {
        if (!this.keycloak.tokenParsed) {
            self.showResults("Not authenticated");
            return;
        }
        var o = 'Token Expires:\t\t' + new Date((this.keycloak.tokenParsed.exp + this.keycloak.timeSkew) * 1000).toLocaleString() + '\n';
        o += 'Token Expires in:\t' + Math.round(this.keycloak.tokenParsed.exp + this.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds\n';
        if (this.keycloak.refreshTokenParsed) {
            o += 'Refresh Token Expires:\t' + new Date((this.keycloak.refreshTokenParsed.exp + this.keycloak.timeSkew) * 1000).toLocaleString() + '\n';
            o += 'Refresh Expires in:\t' + Math.round(this.keycloak.refreshTokenParsed.exp + this.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds';
        }
        self.showResults(o);
    }
}
```
**View**
```html
<template>
  <section class="au-animate">
    <h2>${heading}</h2>
    <div>
    <button click.trigger ="keycloak.login()">Login</button>
    <button click.trigger ="keycloak.logout()">Logout</button>
    <button click.trigger="refreshToken(9999)">Refresh Token</button>
    <button click.trigger="refreshToken(30)">Refresh Token (if <30s validity)</button>
    <button click.trigger="loadProfile()">Get Profile</button>
    <button click.trigger="loadUserInfo()">Get User Info</button>
    <button click.trigger="showResults(keycloak.tokenParsed)">Show Token</button>
    <button click.trigger="showResults(keycloak.refreshTokenParsed)">Show Refresh Token</button>
    <button click.trigger="showResults(keycloak.idTokenParsed)">Show ID Token</button>
    <button click.trigger="showExpires()">Show Expires</button>
    <button click.trigger="showResults(keycloak)">Show Details</button>
    <button click.trigger="showResults(keycloak.createLoginUrl())">Show Login URL</button>
    <button click.trigger="showResults(keycloak.createLogoutUrl())">Show Logout URL</button>
    <button click.trigger="showResults(keycloak.createRegisterUrl())">Show Register URL</button>

   </div>
<h2>Result</h2>
<pre style="background-color: #ddd; border: 1px solid #ccc; padding: 10px; word-wrap: break-word; white-space: pre-wrap;">${result}</pre>

<h2>Events</h2>
<pre style="background-color: #ddd; border: 1px solid #ccc; padding: 10px; word-wrap: break-word; white-space: pre-wrap;">${eventHistory}</pre>

  </section>
</template>

```
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

* Install the browser client-side dependencies with JSPM:

  ```shell
  jspm install aurelia-keycloak
  ```
* No testing yet.  ... You can now run the tests with this command:

  ```shell
  karma start
  ```
