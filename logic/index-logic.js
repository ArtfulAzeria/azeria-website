var lang = navigator.language.split("-")[1];

window.onload = function () {
    if (isLocalStorageAviable() && checkLangInLS()) {
        lang = localStorage.getItem("pref-lang");
    }
    
    updateLang();
}


function updateLang() {
    document.getElementsByClassName("lang-box")[0].innerHTML =
        `<img class="web-lang" draggable="false" src="https://hatscripts.github.io/circle-flags/flags/${lang.toLowerCase()}.svg"/>`;

    storeLangLS();
    updateTexts();
}

function langdrop() {
    if (lang === "ES") {
        lang = "GB"
        updateLang();
    } else if (lang === "GB") {
        lang = "ES"
        updateLang();
    }
}

function isLocalStorageAviable() {
    return typeof (Storage) !== "undefined";
}

function checkLangInLS() {
    return localStorage.getItem("pref-lang") !== null;
}

function storeLangLS() {
    if (isLocalStorageAviable()) {
        localStorage.setItem("pref-lang", lang);
    }
}

function updateTexts() {
    if (lang === "ES") {
        for (var prprty in esES) {
            if (Object.prototype.hasOwnProperty.call(esES, prprty)) {
                document.getElementById(prprty).innerText = esES[prprty];
            }
        }
    } else {
        for (var prprty in enGB) {
            if (Object.prototype.hasOwnProperty.call(enGB, prprty)) {
                document.getElementById(prprty).innerText = enGB[prprty];
            }
        }
    }
    
}

