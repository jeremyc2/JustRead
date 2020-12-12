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
        triggerElement: "#studyQuestions", 
        duration: 350,
        triggerHook: 0.6
    })
    .setTween("#studyQuestions", {backgroundPosition: "bottom -100px right 25px"}) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#change", 
        duration: 300,
        triggerHook: 0.5
    })
    .setTween("#change", {backgroundSize: "350px"}) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#revision", 
        duration: 300,
        triggerHook: 0.5
    })
    .setTween("#revision", {backgroundPositionX: "-150px"}) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#search", 
        duration: 300,
        triggerHook: 0.5
    })
    .setTween("#search", {backgroundPosition: "-70 150"}) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#orange", 
        duration: 300,
        triggerHook: 0.5
    })
    .setTween("#orange", {backgroundPosition: "-200 200"}) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#lightbulb", 
        duration: 300,
        triggerHook: 0.5
    })
    .setTween("#lightbulb", {backgroundSize: "450px"}) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

});
