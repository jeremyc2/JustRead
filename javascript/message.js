function closeMessage(el) {
    el.parentElement.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {

    if(state.has("welcome")) {
        document.getElementById("welcome").style.display = "block"
    }
});