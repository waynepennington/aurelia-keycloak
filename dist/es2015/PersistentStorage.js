export let PersistentStorage = class PersistentStorage {
    constructor() {}
    useCookieStorage() {
        if (typeof localStorage === "undefined") {
            return true;
        }
        try {
            var key = '@@keycloak-session-storage/test';
            localStorage.setItem(key, 'test');
            localStorage.removeItem(key);
            return false;
        } catch (err) {
            return true;
        }
    }

    setitem(key, value) {
        if (useCookieStorage()) {
            setCookie(key, value, cookieExpiration(5));
        } else {
            localStorage.setItem(key, value);
        }
    }

    getItem(key) {
        if (useCookieStorage()) {
            return getCookie(key);
        }
        return localStorage.getItem(key);
    }

    removeItem(key) {
        if (typeof localStorage !== "undefined") {
            try {
                localStorage.removeItem(key);
            } catch (err) {}
        }

        setCookie(key, '', cookieExpiration(-100));
    }

    cookieExpiration(minutes) {
        var exp = new Date();
        exp.setTime(exp.getTime() + minutes * 60 * 1000);
        return exp;
    }

    getCookie(key) {
        var name = key + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    setCookie(key, value, expirationDate) {
        var cookie = key + '=' + value + '; ' + 'expires=' + expirationDate.toUTCString() + '; ';
        document.cookie = cookie;
    }
};;