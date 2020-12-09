gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    let tl = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: "#cleaner",
          pin: true,   // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          end: "+=500", // end after scrolling 500px beyond the start
          scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        }
      });
    
    // add animations and labels to the timeline
    // tl.addLabel("start")
    //   .from("#cleaner span", {scale: 0.3, rotation:45, autoAlpha: 0})
    //   .addLabel("color")
    //   .from("#cleaner span", {backgroundColor: "#28a92b"})
    //   .addLabel("spin")
    //   .to("#cleaner span", {rotation: 360})
    //   .addLabel("end");

    tl.addLabel("start")
        .to("#cleaner span", {rotation: 360, transformOrigin:"50px 20px"})
        .to("#cleaner div", {rotation: -360, transformOrigin:"50px 20px"})

});