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
    duration: 1
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
}, '-=0.6')
.to("#contactIcon", {
    x: 0,
    opacity: 1,
    duration: .5,
    ease: "bounce.out",
    onComplete: afterAnim
})


function stackAnim(){
    gsap.to(".hanging-elem", {
        top: 0,
        ease: "bounce.out",
        stagger: .1,
        duration: 1
    })
}

function afterAnim(){

    // Check for contact form sent status
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("sendsuccess")){
        const sendSuccess = (urlParams.get("sendsuccess") == "true") ? true : false;
            
        if(sendSuccess){
            const sendSuccessElem = document.getElementById("sendSuccess");
            sendSuccessElem.style.display = "inline-flex";
            sendSuccessElem.style.opacity = 1;
            confettiAnim.confettiAnim(document.getElementById("sendSuccessConfetti"));
            const tl = gsap.timeline();
            tl.to("#sendSuccessText", {
                y: 0,
                opacity: 1,
                ease: "bounce.out",
                duration: 1
            }).to("#sendSuccessText", {
                y: "60px",
                opacity: 0,
                ease: "power4.out",
                duration: 1
            }, "+=1.5")
            setTimeout(()=>{
                sendSuccessElem.style.opacity = 0;
                sendSuccessElem.ontransitionend = ()=>{sendSuccessElem.style.display = "none";};
            }, 3000);
        }else{
            console.error("Error: Message Send Failed")
        }
    }

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



