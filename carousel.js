let TEMPArray = document.querySelectorAll(".project-container");
let slideArray = Array.from(TEMPArray);
let carouselState = 0;
document.getElementById("projRight").addEventListener("click", ()=>{
    if(carouselState == 0){
        carouselForwards();
        carouselState++;
        setTimeout(()=>{carouselState = 0;}, 1000);
    }
});
document.getElementById("projLeft").addEventListener("click", ()=>{
    if(carouselState == 0){
        carouselBackwards();
        carouselState++;
        setTimeout(()=>{carouselState = 0;}, 1000);
    }
});
function carouselForwards(){
    for(let i =0; i< slideArray.length;i++){
        slideArray[i].style.transition = "transform 1s ease";
        if(i == 0){
            slideArray[i].style.transition = "transform 0.5s ease";
            slideArray[i].setAttribute("value", 999);
            slideArray[i].style.transform = "translateX(-100vw)";
        } else{
            let tempLeft = parseFloat(slideArray[i].getAttribute("value"));
            console.log(tempLeft)
            tempLeft -= 300;
            slideArray[i].setAttribute("value", tempLeft);
            slideArray[i].style.transform = "translateX(" + tempLeft + "px)";
        }
        
        
    }
    setTimeout(()=>{
        for(let i=0; i < slideArray.length; i++){
            if(parseFloat(slideArray[i].getAttribute("value")) == 999){
                
                
                let tempVal = parseFloat(slideArray[slideArray.length - 1].getAttribute("value")) + 300;
                slideArray[i].setAttribute("value", tempVal);
                
                
                let tempSlide = slideArray[i];
                slideArray.shift();
                
                slideArray[slideArray.length] = tempSlide;
                slideArray[slideArray.length - 1].style.transition = "transform 0s ease";
               
                
                slideArray[slideArray.length - 1].style.transform = "translateX(130vw)";
                setTimeout(()=>{
                    slideArray[slideArray.length - 1].style.transition = "transform 0.3s ease";
                    slideArray[slideArray.length - 1].style.transform = "translateX("+ tempVal + "px)";
                }, 10);
                

                
            }
        }

    },500);
    
   
}

function carouselBackwards(){
    for(let i =0; i< slideArray.length;i++){
        slideArray[i].style.transition = "transform 1s ease";
        if(i == slideArray.length - 1){
            slideArray[i].style.transition = "transform 0.5s ease";
            slideArray[i].setAttribute("value", "999");
            slideArray[i].style.transform = "translateX(100vw)";
        } else{
            let tempLeft = parseFloat(slideArray[i].getAttribute("value"));
            console.log(tempLeft)
            tempLeft += 300;
            slideArray[i].setAttribute("value", tempLeft);
            slideArray[i].style.transform = "translateX(" + tempLeft + "px)";
        }
        
        
    }
    setTimeout(()=>{
        for(let i=0; i < slideArray.length; i++){
            if(parseFloat(slideArray[i].getAttribute("value")) == 999){
                slideArray[i].style.transition = "none";
                let tempVal = parseFloat(slideArray[0].getAttribute("value")) - 300;
                slideArray[i].setAttribute("value", tempVal);
                
                
                let tempSlide = slideArray[i];
                slideArray.pop();
                
                slideArray.unshift(tempSlide);
               
                slideArray[0].style.transition = "transform 0s ease";
               
                
                slideArray[0].style.transform = "translateX(-130vw)";
                setTimeout(()=>{
                    slideArray[0].style.transition = "transform 0.3s ease";
                    slideArray[0].style.transform = "translateX(" + tempVal +"px)";
                }, 10);
                
            }
        }

    },500);
    
   
}