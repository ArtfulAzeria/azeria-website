

const LS_LOCALE_KEY = "locale";

class LangConf {
    private _language: string;
    private _country: string;

    public constructor() {
        this.updateClassFromLocale(this.getNavigatorLocale());
        
        if (this.aviableLocalStorage() && this.keyExists()) {
            this.updateClassFromLocale(this.getLocalStorageLocale());
        }

        this.updateSrc(this.getCountry);
        this.updateTexts();
        this.displayImage();
        this.updateLocalStorage();
    }

    public get getLanguage(): string {
        return this._language;
    }

    public get getCountry(): string {
        return this._country;
    }

    public set language(language : string) {
        this._language = language;
    }

    public set country(country : string) {
        this._country = country;
    }
    
    private displayImage(): void {
        var element: HTMLElement | null = document.getElementById("web-lang");
        if (element !== null) {
            element.style.display = "block";
        }
    }

    /**
     * 
     * @param country The new country code to use.
     */
    public updateSrc(country: string): void {
        var srcValue: string = `https://hatscripts.github.io/circle-flags/flags/${country.toLowerCase()}.svg`
        document.getElementsByClassName("web-lang")[0].setAttribute("src", srcValue);
    }

    private aviableLocalStorage() {
        return typeof (Storage) !== "undefined";
    }

    private keyExists(): boolean {
        return localStorage.getItem(LS_LOCALE_KEY) !== null
    }

    /**
     * 
     * @returns Retrieves the value from LS_LOCALE.
     */
    private getLocalStorageLocale(): string {
        var value;
        if (this.aviableLocalStorage()) {
            if (this.keyExists()) {
                value = localStorage.getItem(LS_LOCALE_KEY);
            }
        }
        return value;
    }

    private getNavigatorLocale(): string {
        return navigator.language;
    }

    private getClassLocale(): string {
        return this._language + "-" + this._country;
    }

    private updateClassFromLocale(locale: string): void {
        var [language, country] = locale.split("-");
        this.language = language;
        this.country = country;
    }

    public updateLocalStorage() {
        if (this.aviableLocalStorage()) {
            localStorage.setItem(LS_LOCALE_KEY, this.getClassLocale());
        }
    }

    public changeLocale(): void {
        if (this.getClassLocale() === "es-ES") {
            this.updateClassFromLocale("en-GB");
        } else if (this.getClassLocale() === "en-GB") {
            this.updateClassFromLocale("es-ES");
        }
    }

    public updateTexts(): void {
        if (this.getClassLocale() === "en-GB") {
            fetch("../conf/locale/en-GB/en-GB_locale.json")
            .then(res => res.json())
            .then((res) => {
                console.log("json aviable");
                console.log(res);
                
                
                for (var prprty in res) {
                    if (Object.prototype.hasOwnProperty.call(res, prprty)) {
                        document.getElementById(prprty)!.innerText = res[prprty];
                    }
                    
                }
            })
        } else if(this.getClassLocale() === "es-ES") {
            fetch("../conf/locale/es-ES/es-ES_locale.json")
            .then(res => res.json())
            .then((res) => {
                console.log("json aviable");
                console.log(res);
                
                
                for (var prprty in res) {
                    if (Object.prototype.hasOwnProperty.call(res, prprty)) {
                        document.getElementById(prprty)!.innerText = res[prprty];
                    }
                    
                }
            })
        }
    }
    
}

var langconf = new LangConf();

function updateLang() {
    langconf.changeLocale();
    langconf.updateLocalStorage();
    langconf.updateSrc(langconf.getCountry);
    langconf.updateTexts();
}



