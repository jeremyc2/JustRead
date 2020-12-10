var controller = new ScrollMagic.Controller();

document.addEventListener("DOMContentLoaded", () => {

    console.log(document.getElementById("cleaner"));

    new ScrollMagic.Scene({
        triggerElement: "#cleaner",
        triggerHook: 0.7, // show, when scrolled 10% into view
    })
    .setClassToggle("#cleaner", "orbit")
    .addTo(controller);

});