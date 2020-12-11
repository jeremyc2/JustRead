var controller = new ScrollMagic.Controller();

document.addEventListener("DOMContentLoaded", () => {

    console.log(document.getElementById("cleaner"));

    new ScrollMagic.Scene({
        triggerElement: "#cleaner",
        triggerHook: 0.65, // show, when scrolled 45% into view
    })
    .setClassToggle("#cleaner", "orbit")
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#orange", 
        duration: 300,
        triggerHook: 0.5
    })
    .setTween("#orange", {backgroundPosition: "-200 200"}) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

});