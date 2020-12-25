function unwelcome() {
    document.getElementById("welcome").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {

    var params;
    if(typeof urlParams != "undefined") {
        params = urlParams;
    } else {
        params = new URLSearchParams(window.location.search);
    }

    if(params.has("welcome")) {
        document.getElementById("welcome").style.display = "block";
    }
});