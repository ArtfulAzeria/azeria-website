var lang = navigator.language.split("-")[1];

window.onload = function () {
    updateLang();
}

function updateLang() {
    document.getElementsByClassName("lang-box")[0].innerHTML =
            `<img class="web-lang" draggable="false" title="Select language" src="https://hatscripts.github.io/circle-flags/flags/${lang.toLowerCase()}.svg"/>`;
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

