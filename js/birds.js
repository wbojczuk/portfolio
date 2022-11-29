"use strict";

const birdAnim = {

    setup: ()=>{

        const birds = document.querySelectorAll(".bird");
        birds.forEach((bird)=>{
            birdAnim.animBird(bird);
        });

    },

    animBird: (bird)=>{
        bird.style.top = `${rand(20,70)}%`;
        bird.style.left = "-20%";
        const animSpeed = rand(6,10);
        setTimeout(()=> {

        bird.style.transition = `${animSpeed}s left linear, ${animSpeed}s top linear`;
        bird.style.transform = `scale(${rand(0.3,0.5)})`;
        setTimeout(()=>{
            bird.style.left = "100%";
            bird.style.top = `${rand(10, 50)}%`;
            setTimeout(()=>{
                bird.style.transition = "none";
                setTimeout(()=>{
                    birdAnim.animBird(bird);
                }, 100)
            }, ((animSpeed * 1000)));
        }, 100);
        

    }, Math.floor(rand(200, 5000)));
    }


};

function rand(min, max){
    return (Math.random() * (max - min) + min).toFixed(2);
}
birdAnim.setup();