var LS_LOCALE_KEY = "locale";
var LangConf = /** @class */ (function () {
    function LangConf() {
        this.updateClassFromLocale(this.getNavigatorLocale());
        if (this.aviableLocalStorage() && this.keyExists()) {
            this.updateClassFromLocale(this.getLocalStorageLocale());
        }
        this.updateSrc(this.getCountry);
        this.display();
        this.updateLocalStorage();
    }
    Object.defineProperty(LangConf.prototype, "getLanguage", {
        get: function () {
            return this._language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LangConf.prototype, "getCountry", {
        get: function () {
            return this._country;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LangConf.prototype, "language", {
        set: function (language) {
            this._language = language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LangConf.prototype, "country", {
        set: function (country) {
            this._country = country;
        },
        enumerable: false,
        configurable: true
    });
    LangConf.prototype.display = function () {
        var element = document.getElementById("web-lang");
        if (element !== null) {
            element.style.display = "block";
        }
    };
    /**
     *
     * @param country The new country code to use.
     */
    LangConf.prototype.updateSrc = function (country) {
        var srcValue = "https://hatscripts.github.io/circle-flags/flags/".concat(country.toLowerCase(), ".svg");
        document.getElementsByClassName("web-lang")[0].setAttribute("src", srcValue);
    };
    LangConf.prototype.aviableLocalStorage = function () {
        return typeof (Storage) !== "undefined";
    };
    LangConf.prototype.keyExists = function () {
        return localStorage.getItem(LS_LOCALE_KEY) !== null;
    };
    /**
     *
     * @returns Retrieves the value from LS_LOCALE.
     */
    LangConf.prototype.getLocalStorageLocale = function () {
        var value;
        if (this.aviableLocalStorage()) {
            if (this.keyExists()) {
                value = localStorage.getItem(LS_LOCALE_KEY);
            }
        }
        return value;
    };
    LangConf.prototype.getNavigatorLocale = function () {
        return navigator.language;
    };
    LangConf.prototype.getClassLocale = function () {
        return this._language + "-" + this._country;
    };
    LangConf.prototype.updateClassFromLocale = function (locale) {
        var _a = locale.split("-"), language = _a[0], country = _a[1];
        this.language = language;
        this.country = country;
    };
    LangConf.prototype.updateLocalStorage = function () {
        if (this.aviableLocalStorage()) {
            localStorage.setItem(LS_LOCALE_KEY, this.getClassLocale());
        }
    };
    LangConf.prototype.changeLocale = function () {
        if (this.getClassLocale() === "es-ES") {
            this.updateClassFromLocale("en-GB");
        }
        else if (this.getClassLocale() === "en-GB") {
            this.updateClassFromLocale("es-ES");
        }
    };
    return LangConf;
}());
var langconf = new LangConf();
function updateLang() {
    langconf.changeLocale();
    langconf.updateLocalStorage();
    langconf.updateSrc(langconf.getCountry);
}
