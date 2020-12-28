var help;

function showHelp() {
    help.style.display = "block";
    help.classList.remove("hide");
    help.classList.add("show");
}

function hideHelp() {

    help.classList.remove("show");

    // https://css-tricks.com/restart-css-animation/
    void help.offsetWidth;
    
    help.classList.add("hide");
}

document.addEventListener('DOMContentLoaded', () => {

    help = document.getElementById("help-container");
    
    help.addEventListener("animationend", function(e) {
        if(e.target.classList.contains("hide")) {
            e.target.style.display = "none";
        }
    });

    document.getElementById("help-dialog").addEventListener("click", function(e) {e.stopPropagation()});

    help.addEventListener("click", hideHelp)

});