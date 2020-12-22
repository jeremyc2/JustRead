var i = 0;
const urlParams = new URLSearchParams(window.location.search);

var content;
var appendContentButton;

var promise;

function buildBookmarkURL(index) {
    return document.location.origin + document.location.pathname + `?index=${index}`
    // window.history.replaceState(null, null, `?index=${index}`);
}

function injectText(index, text) {
    if(content == null) return;

    console.log(`ITI: ${index}`);

    var span = document.createElement("span");
    span.id = index;

    span.innerHTML = text;
    content.appendChild(span);
    i = index;
}

function appendText(index, text) {
    if(content == null) return;

    console.log(`ATI: ${index}`);

    var span = document.createElement("span");
    span.id = index;

    span.innerHTML += " " + text;
    content.appendChild(span);
}

document.addEventListener("keydown", function(e) {
    if(e.code == "Space") {
        promise = getRandomSentence(injectText);
    }
});

function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function appendContent() {
    if(isElementInViewport(appendContentButton)) {
        promise = promise
            .then(() => getNextSentence(i, appendText))
            .then(() => i++)
            .then(() => {
                if(isElementInViewport(appendContentButton)) {
                    appendContent();
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    if(urlParams.has("index")) {
        i = urlParams.get("index");
        promise = getSentence(i, injectText);
    } else {
        promise = getFirstSentence(injectText);
    }

    content = document.getElementById("content");
    appendContentButton = document.getElementById("append-content-button");
    appendContent();

    document.addEventListener('load', appendContent, false);
    document.addEventListener('scroll', appendContent, false);
    document.addEventListener('resize', appendContent, false);
}, false);