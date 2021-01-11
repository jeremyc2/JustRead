function closeMessage(el) {
    el.parentElement.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {

    var tempState;
    if(typeof state != "undefined") {
        tempState = state;
    } else {
        tempState = new State(window.location.search);
    }

    if(tempState.has("welcome")) {
        document.getElementById("welcome").style.display = "block"
    }
});