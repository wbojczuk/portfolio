"use strict";

const asFade = {
    speed: "5s",
    disableOnMobile: true,
    amount: "1vw",
    // Percentage 1-100 That Elements must be in viewport to fade in 
    elemPercentage: 30,

    init: ()=>{
        const isElementXPercentInViewport = function(el, percentVisible) {
            let
              rect = el.getBoundingClientRect(),
              windowHeight = (window.innerHeight || document.documentElement.clientHeight);
          
            return !(
              Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
              Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
            )
          };

        const fadeElems = document.querySelectorAll(".as-fade-down, .as-fade-up, .as-fade-left, .as-fade-right");
        
        // initial scan
        fadeElems.forEach((elem)=>{
            if(isElementXPercentInViewport(elem, asFade.elemPercentage)){
                elem.classList.add("as-fade-on");
            }
        });

        // Scroll checks
        document.addEventListener("scroll", ()=>{
            fadeElems.forEach((elem)=>{
                if(isElementXPercentInViewport(elem, asFade.elemPercentage)){
                    elem.classList.add("as-fade-on");
                }else{
                    elem.classList.remove("as-fade-on");
                }
            });
        });


        
    }
};
if(asFade.disableOnMobile){
    if(window.matchMedia("only screen and (min-width: 900px)").matches){
        asFade.init();
    }
}else{
    asFade.init();  
}
