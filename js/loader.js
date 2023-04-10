const tl = gsap.timeline();

tl.to(".loader-bar", {
    scaleX:0,
    stagger: .1,
    duration:.5,
    ease: "power3.inOut",
}, 0.1)
.to("#allContent", {
    "clip-path": "circle(100% at 50% 50%)",
    ease: "power4.inOut",
    duration: 1,
    onComplete: afterAnim
}, "-=.1")
.from("#resumeButton, #resumeButtonLine1, #resumeButtonLine2", {
    y: -200,
    ease: "bounce.out",
    duration: 1
})
.from("#mainMenu", {
    y: "-200%",
    ease: "bounce.out",
    duration: 1.5
}, '-=0.6');



function stackAnim(){
    gsap.to(".hanging-elem", {
        top: 0,
        ease: "bounce.out",
        stagger: .1,
        duration: 1
    })
}

function afterAnim(){
    const myObserver = new IntersectionObserver(
        (entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    myObserver.unobserve(entry.target);
                    stackAnim();
                }
                
            })
        },{
            // Loads if image is 1/100 in the viewport
            threshold: 0.5
        }
    );
    myObserver.observe(document.getElementById("hangingElemContainer"))
}



