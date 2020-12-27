function closeMessage(el) {
    el.parentElement.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {

    var params;
    if(typeof urlParams != "undefined") {
        params = urlParams;
    } else {
        params = new URLSearchParams(window.location.search);
    }

    if(params.has("welcome")) {
        [...document.getElementsByClassName("message")].forEach(element => {
            element.style.display = "block";
        });
    }
});