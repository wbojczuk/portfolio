/*
 Program: textstorm.js (ALTERED FOR THIS SITE)
 Version: 1.0 
 Creator: William Bojczuk (wiliambojczuk@gmail.com)
 License: BSD
 Github: https://github.com/wbojczuk
 Website: https://williambojczuk.com
 
 */

const textStorm = {
    userSelect: false,
    initialState: false,
    // OPTIONS
    // SIMPLE WRITE SPEED (MS)
     simpleWriteSpeed: 40,
    //  DEFAULT  ALSO IN MS
     simpleWriteDelay: 2000,
    //  DEFAULT TIME TO IDLE PLACEHOLDER AFTER ANIMATION. Leave null for infinite idling;
     simpleWriteIdle: 500,
     simpleWritePlaceholder: true,

     // Multi WRITE SPEED (MS)

     mulWriteSpeed: 40,
     mulDelSpeed: 30,
    //  DEFAULT  ALSO IN MS
     mulWriteDelay: 2000,
    //  DEFAULT TIME TO IDLE PLACEHOLDER AFTER ANIMATION. Leave null for infinite idling;
     mulWriteIdle: 1000,
     mulAfterIdle: null,
     mulWritePlaceholder: true,
     mulWriteLoop: true,

    //  FALLING WRITE SETTINGS
    fallWriteSpeed: 40,
    fallWriteFallSpeed: 1000,
    fallWriteStart: "-15vh",
    fallWriteOpacity: true,

    //  ROTATE WRITE SETTINGS
    rotateWriteSpeed: 100,
    rotateWriteRotateSpeed: 150,
    rotateWriteStart: "-90deg",
    rotateWriteOpacity: true,

    //  SLIDE WRITE SETTINGS
    slideWriteSpeed: 50,
    slideWriteSlideSpeed: 500,
    slideWriteStart: "-5vw",
    slideWriteOpacity: true,
    slideWriteStretchAmount: "60deg",

    // TEXT WAVE SETTINGS
    waveWriteSpeed: 50,
    waveWriteAnimSpeed: 600,
    waveWriteHeight: "4vh",
    waveWriteOpacity: true,
    waveWriteDirection: "left",


    setup: ()=>{

        // INJECT STYLES
 const styleElem = document.createElement("style");
 styleElem.textContent = `.as-write {
     opacity:0;
     position: relative;
     text-align: right;
     display: inline-block;
     user-select: none;
     pointer-events: none;
 }
 
 
 .as-write-inner {
     position: relative;
     height: 100%;
 }
 
 .as-write-placeholder {
     display: inline-block;
     background-color: rgba(0,0,0,0.6);
     position: absolute;
     right: -5px;
     opacity: 0;
     top: 0;
     height: 100%;
     width: 3px;
     border: 0px solid transparent;
     border-radius: 20px;
     animation: fade_in_out 1s infinite;
 }
 
 .as-text-fade-in {
     animation: fade_in 0.1s forwards;
 }
 .as-text-fade-out {
     animation: fade_out 0.1s forwards;
 }
 
 @keyframes fade_in_out {
     0%{
         opacity: 0;
     }
     50%{
         opacity: 100;
     }
     100%{
          opacity: 0;
         }
 }
 
 @keyframes fade_in {
     0%{
         opacity: 0;
     }
     100%{
         opacity: 100;
     }
 }
 
 @keyframes fade_out {
     0%{
         opacity: 100;
     }
     100%{
         opacity: 0;
     }
 }
 
 .as-mulwrite{
     opacity:0;
 }
 
 .as-mulwrite-text{
     display: none;
 }
 
 
 .as-fallwrite{
     opacity:0;
     position: relative;
     text-align: right;
     display: inline-block;
     user-select: none;
     pointer-events: none;
 }
 
 .as-fallwrite-span{
     display: inline-block;
     white-space: pre;
 }
 
 @keyframes falling_text_opacity {
     0%{opacity: 0;}
     100%{opacity: 100; transform: translateY(0);}  
 }
 
 @keyframes falling_text {
     100%{transform: translateY(0);}  
 }
 
 .as-rotatewrite {
     opacity:0;
     position: relative;
     text-align: right;
     display: inline-block;
     user-select: none;
     pointer-events: none;
 }
 
 .as-rotatewritespan {
     display: inline-block;
     white-space: pre;
 }
 
 @keyframes rotate_write {
     0%{
         opacity: 100;
     }
     100%{
         transform: rotate(0);
     }
 }
 
 @keyframes rotate_write_opacity {
     0%{
         opacity: 0;
     }
 
     100%{
         transform: rotate(0);
         opacity: 100;
     }
 }
 
 .as-slidewrite {
     opacity:0;
     position: relative;
     text-align: right;
     display: inline-block;
     user-select: none;
     pointer-events: none;
 }
 
 .as-slidewrite-inner{
     position: absolute;
     top:0;
     left:0;
     width: 100.1%;
     height:100%;
     user-select: all;
     pointer-events: all;
 }
 
 .as-slidewritespan {
     display: inline-block;
     white-space: pre;
 }
 
 @keyframes slide_write {
     100%{transform: translateX(0) skewX(0deg);}
 }
 
 @keyframes slide_write_opacity {
     0%{opacity:0}
     100%{opacity:100;transform: translateX(0) skewX(0deg);}
 }
 
 .as-wavewrite {
     opacity:0;
     position: relative;
     display: inline-block;
     user-select: none;
     pointer-events: none;
 }
 
 .as-wavewrite-span {
     display: inline-block;
     white-space: pre;
     text-align: center;
 }
 
 .as-write-inject{
     position: absolute;
     top:0;
     left:0;
     width: 100%;
     height:100%;
     user-select: all;
     pointer-events: all;
     text-align: right;
     white-space: pre;
 }
 `;
 document.getElementsByTagName("head")[0].append(styleElem);
 const isElementXPercentInViewport = function(el, percentVisible) {
    let
      rect = el.getBoundingClientRect(),
      windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
  };

        /* TEXT WAVE ANIM STYLESHEET*/
        const waveStyles = document.createElement("style");
        waveStyles.setAttribute("id", "waveStyles");
        
        document.getElementsByTagName("head")[0].append(waveStyles);
        // ONLOAD TRIGGERS

        // SIMPLE WRITE

        if(document.querySelectorAll(".as-write")){
            const writeElems = document.querySelectorAll(".as-write");
            const writeElemsLength = writeElems.length;

            for(let i=0; i<writeElemsLength; i++){
                const currentElem = writeElems[i];
                
                currentElem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.simpleWriteStart(currentElem);}, currentElem.dataset.wait): textStorm.simpleWriteStart(currentElem);
                
            }
        } 

        // MULWRITE 
        if(document.querySelectorAll(".as-mulwrite")){
            const writeElems = document.querySelectorAll(".as-mulwrite");
            const writeElemsLength = writeElems.length;

            for(let i=0; i<writeElemsLength; i++){
                const currentElem = writeElems[i];

                const currentElemText = currentElem.querySelectorAll(".as-mulwrite-text");
                currentElem.innerHTML = "&#8203";

                currentElem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.mulWriteIn(currentElem, currentElemText);}, currentElem.dataset.wait): textStorm.mulWriteIn(currentElem, currentElemText);
    
                
            }
        }

        // FALL WRITE

        if(document.querySelector(".as-fallwrite")){
            const writeElems = document.querySelectorAll(".as-fallwrite");
            const writeElemsLength = writeElems.length;
            for(let i = 0; i<writeElemsLength; i++){
                const currentElem = writeElems[i];

                currentElem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.fallWriteIn(currentElem);}, currentElem.dataset.wait): textStorm.fallWriteIn(currentElem);
            }
        }


        // ROTATE WRITE

        if(document.querySelector(".as-rotatewrite")){
            const writeElems = document.querySelectorAll(".as-rotatewrite");
            const writeElemsLength = writeElems.length;
            for(let i = 0; i<writeElemsLength; i++){
                const currentElem = writeElems[i];

                currentElem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.rotateWriteIn(currentElem);}, currentElem.dataset.wait): textStorm.rotateWriteIn(currentElem);
            }
        }

        // SLIDE WRITE


        if(document.querySelector(".as-slidewrite")){
            const writeElems = document.querySelectorAll(".as-slidewrite");
            const writeElemsLength = writeElems.length;
            for(let i = 0; i<writeElemsLength; i++){
                const currentElem = writeElems[i];
                
                currentElem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.slideWriteIn(currentElem);}, currentElem.dataset.wait): textStorm.slideWriteIn(currentElem);
            }
        }

        // TEXT WAVE

        if(document.querySelector(".as-wavewrite")){
            const writeElems = document.querySelectorAll(".as-wavewrite");
            const writeElemsLength = writeElems.length;
            for(let i = 0; i<writeElemsLength; i++){
                const currentElem = writeElems[i];
                
                currentElem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.waveWriteIn(currentElem);}, currentElem.dataset.wait): textStorm.waveWriteIn(currentElem);
            }
        }

        


    },
    // simpleWrite Write Function
    simpleWriteStart: (currentElem)=>{
        const spanInner = document.createElement("span");
        const placeholderSpan = document.createElement("span");

        placeholderSpan.setAttribute("class", "as-write-placeholder");
        spanInner.setAttribute("class", "as-write-inner");
        let tempText = currentElem.textContent;
        const textInner = document.createElement("div");
        textInner.className = "as-write-inject";
        textInner.style.textAlign = "left";
        currentElem.prepend(textInner);
        const currentInner = currentElem.querySelector(".as-write-inject");
        currentInner.style.color = window.getComputedStyle(currentElem).color;
        currentElem.style.color = "rgba(0,0,0,0)";
        currentElem.style.opacity = 100;
        currentInner.innerHTML = "&#8203";
        currentInner.append(spanInner.cloneNode(false))
        const currentElemInner = currentInner.querySelector(".as-write-inner");
       
        currentElemInner.append(placeholderSpan.cloneNode(false));
        const currentPlaceholder = currentElemInner.querySelector(".as-write-placeholder");
        // SETTINGS
        let speedSettings = textStorm.simpleWriteSpeed;
        if(currentElem.hasAttribute("data-speed")){
            speedSettings = currentElem.dataset.speed;
        }


        if(currentElem.hasAttribute("data-color")){
            currentPlaceholder.style.backgroundColor = currentElem.dataset.color;
        }

        if(currentElem.hasAttribute("data-width")){
            currentPlaceholder.style.width = currentElem.dataset.width;
        }

        if(currentElem.hasAttribute("data-offseth")){
            currentPlaceholder.style.right = currentElem.dataset.offseth;
        }
        if(currentElem.hasAttribute("data-offsetv")){
            currentPlaceholder.style.top = currentElem.dataset.offsetv;
        }

        if(currentElem.hasAttribute("data-height")){
            currentPlaceholder.style.height = currentElem.dataset.height;
        }

        let placeholderSettings = textStorm.simpleWritePlaceholder;
        if(currentElem.hasAttribute("data-placeholder")){
            placeholderSettings = currentElem.dataset.placeholder;
        }

        let currentDelay = textStorm.simpleWriteDelay;
            if(currentElem.hasAttribute("data-delay")){
                currentDelay = currentElem.dataset.delay;
            }
        let currentIdle = textStorm.simpleWriteIdle;
        if(currentElem.hasAttribute("data-idle")){
            currentIdle = currentElem.dataset.idle;
        }
        let uSelectSettings = textStorm.userSelect;
        if(currentElem.hasAttribute("data-userselect")){
            uSelectSettings = (currentElem.dataset.userselect == "true") ? true : false;
        }

        if(!uSelectSettings){
            currentInner.style.userSelect = "none";
            currentInner.style.pointerEvents = "none";
        }
        

        if(placeholderSettings === false || placeholderSettings == "false"){currentPlaceholder.style.display = "none";}

        // USED TO INITIALIZE ITERATION COUNTER
        let placeholderTimer = 0;
        currentPlaceholder.onanimationiteration = ()=>{placeholderTimer++;};

       const textSpan = document.createElement("span");
       textSpan.className = "as-text-fade-in";

        currentElem.style.opacity = "100";

        let textCount = 0;
        setTimeout(writeLoadLoop, currentDelay);
            function writeLoadLoop(){
                let currentText = textSpan.cloneNode("false");
                currentText.textContent = tempText.charAt(textCount);
                currentElemInner.insertBefore(currentText, currentElemInner.lastChild) 
                
                textCount++;
                if(textCount<tempText.length){
                    setTimeout(writeLoadLoop, Math.random() * (speedSettings - (speedSettings - 10)) + (speedSettings - 10));
                } else {
                    if(currentIdle){
                        setTimeout(()=>{
                            currentPlaceholder.addEventListener("animationiteration", ()=>{currentPlaceholder.remove();
                            });
                            let initialState = textStorm.initialState;
                            if(currentElem.hasAttribute("data-initialstate")){
                                initialState = (currentElem.dataset.initialstate == "true");
                            }
                            if(initialState){
                                currentElem.style.color = window.getComputedStyle(currentElemInner).color;
                                currentInner.remove();
                                currentElem.classList.remove("as-write");
                                textStorm.removeData(currentElem);
                            }   
                           
                            }, currentIdle);
                    }
                }
            }
    },

    // mulWrite Write Function
    mulWriteIn: (currentElem, textArray)=>{
        const spanInner = document.createElement("span");
        const placeholderSpan = document.createElement("span");
        placeholderSpan.setAttribute("class", "as-write-placeholder");
        spanInner.setAttribute("class", "as-write-inner");
        let currentCount = 0;
        let currentText = textArray[currentCount].textContent;
        let tempText = currentText;
        currentElem.innerHTML = "&#8203";

        
        

        currentElem.append(spanInner.cloneNode(false))
        const currentElemInner = currentElem.querySelector(".as-write-inner");
       
        currentElemInner.append(placeholderSpan.cloneNode(false));
        const currentPlaceholder = currentElemInner.querySelector(".as-write-placeholder");
        const textSpan = document.createElement("span");
        textSpan.className = "as-text-fade-in";

        currentElem.style.opacity = "100";

        // SETTINGS
        let speedSettings = textStorm.mulWriteSpeed;
        if(currentElem.hasAttribute("data-writespeed")){
            speedSettings = currentElem.dataset.writespeed;
        }
        let delSpeedSettings = textStorm.mulDelSpeed;
        if(currentElem.hasAttribute("data-delspeed")){
            delSpeedSettings = currentElem.dataset.delspeed;
        }
        
        let currentDelay = textStorm.mulWriteDelay;
            if(currentElem.hasAttribute("data-delay")){
                currentDelay = currentElem.dataset.delay;
            }

        if(currentElem.hasAttribute("data-color")){
            currentPlaceholder.style.backgroundColor = currentElem.dataset.color;
        }

        if(currentElem.hasAttribute("data-width")){
            currentPlaceholder.style.width = currentElem.dataset.width;
        }

        if(currentElem.hasAttribute("data-offset")){
            currentPlaceholder.style.right = currentElem.dataset.offset;
        }

        if(currentElem.hasAttribute("data-height")){
            currentPlaceholder.style.height = currentElem.dataset.height;
        }

        let placeholderSettings = textStorm.mulWritePlaceholder;
        if(currentElem.hasAttribute("data-placeholder")){
            placeholderSettings = currentElem.dataset.placeholder;
        }

        let loopSettings = textStorm.mulWriteLoop;
        if(currentElem.hasAttribute("data-loop")){
            loopSettings = currentElem.dataset.loop;
            loopSettings.toLowerCase()
        }

        
        let currentIdle = textStorm.mulWriteIdle;
        if(currentElem.hasAttribute("data-idle")){
            currentIdle = currentElem.dataset.writeidle;
        }

        

        let currentAfterIdle = textStorm.mulAfterIdle;
        if(currentElem.hasAttribute("data-afteridle")){
            currentAfterIdle = currentElem.dataset.afteridle;
        }
        let uSelectSettings = textStorm.userSelect;
        if(currentElem.hasAttribute("data-userselect")){
            uSelectSettings = (currentElem.dataset.userselect == "true") ? true : false;
        }

        if(!uSelectSettings){
            currentElemInner.style.userSelect = "none";
            currentElemInner.style.pointerEvents = "none";
        }

        if(placeholderSettings === false || placeholderSettings == "false"){currentPlaceholder.style.display = "none";}
            // USED TO INITIALIZE ITERATION COUNTER
            let placeholderTimer = 0;
            currentPlaceholder.onanimationiteration = ()=>{placeholderTimer++;};
            let textCount = 0;

            setTimeout(writeLoadLoop, currentDelay);
        function writeLoadLoop(){
            let currentText = textSpan.cloneNode("false");
            currentText.textContent = tempText.charAt(textCount);
            currentElemInner.insertBefore(currentText, currentElemInner.lastChild); 
            
            textCount++;
            if(textCount<tempText.length){
                if(isElementXPercentInViewport(currentElem,1)){
                    setTimeout(writeLoadLoop, Math.random() * (speedSettings - (speedSettings - 10)) + (speedSettings - 10));
                   }else{
                    let checkInterval = setInterval(()=>{
                        if(isElementXPercentInViewport(currentElem, 1)){
                            setTimeout(writeLoadLoop, Math.random() * (speedSettings - (speedSettings - 10)) + (speedSettings - 10));
                            clearInterval(checkInterval);
                           } 
                    },200)
                   }
            } else { 
                if(currentCount+1<textArray.length||(loopSettings!==false&&loopSettings!=="false")){
                   if(isElementXPercentInViewport(currentElem,1)){
                    setTimeout(delLoadLoop, currentIdle);
                   }else{
                    let checkInterval = setInterval(()=>{
                        if(isElementXPercentInViewport(currentElem, 1)){
                            setTimeout(delLoadLoop, currentIdle);
                            clearInterval(checkInterval);
                           } 
                    },200)
                   }
                    
            } else if(currentAfterIdle){
                setTimeout(()=>{
                    currentPlaceholder.addEventListener("animationiteration", ()=>{currentPlaceholder.remove();})
                    }, currentAfterIdle);
            }
        }
        }
        // MulWrite Delete Function
        function delLoadLoop(){
            const currentElemTarget = currentElemInner.lastChild.previousSibling;
            const currentInterval =  Math.random() * (delSpeedSettings - (delSpeedSettings - 10)) + (delSpeedSettings - 10);
            currentElemTarget.style.animation = "none";
            currentElemTarget.style.animation = `fade_out ${currentInterval}ms forwards`;
            currentElemTarget.onanimationend = (evt)=>{
                evt.target.remove();
                if(currentElemInner.lastChild.previousSibling){
                    delLoadLoop();
                }else{
                    if(currentCount+1<textArray.length){
                        currentCount++;
                        tempText = textArray[currentCount].textContent;
                        textCount = 0;
                        if(isElementXPercentInViewport(currentElem,1)){
                            setTimeout(writeLoadLoop, currentIdle);
                           }else{
                            let checkInterval = setInterval(()=>{
                                if(isElementXPercentInViewport(currentElem, 1)){
                                    setTimeout(writeLoadLoop, currentIdle);
                                    clearInterval(checkInterval);
                                   } 
                            },200)
                           }
                        
                    }else{
                        currentCount = 0;
                        tempText = textArray[currentCount].textContent;
                        textCount = 0;
                        if(isElementXPercentInViewport(currentElem,1)){
                            setTimeout(writeLoadLoop, currentIdle);
                           }else{
                            let checkInterval = setInterval(()=>{
                                if(isElementXPercentInViewport(currentElem, 1)){
                                    setTimeout(writeLoadLoop, currentIdle);
                                    clearInterval(checkInterval);
                                   } 
                            },200)
                           }
                    }
                }
            };
            
            
        }
    },

   fallWriteIn: (elem)=>{
    let tempText = elem.textContent;
    const innerElem = document.createElement("div");
    innerElem.className = "as-write-inject";
    innerElem.style.textAlign = "left";
    innerElem.style.color = window.getComputedStyle(elem).color;
    elem.append(innerElem);
    elem.style.color="rgba(0,0,0,0)";
    elem.style.opacity = 100;
    const currentInner = elem.querySelector(".as-write-inject"); 

    // SETTINGS
    let speedSettings = textStorm.fallWriteSpeed;
    if(elem.hasAttribute("data-writespeed")){
        speedSettings = elem.dataset.writespeed;
    }
    let fallSpeed = textStorm.fallWriteFallSpeed;
    if(elem.hasAttribute("data-rotatespeed")){
        fallSpeed = elem.dataset.rotatespeed;
    }
    let startSettings = textStorm.fallWriteStart;
    if(elem.hasAttribute("data-writestart")){
        startSettings = elem.dataset.writestart;
    }
    let opacitySettings = textStorm.fallWriteOpacity;
    if(elem.hasAttribute("data-opacity")){
        opacitySettings = elem.dataset.opacity;
    }
    let uSelectSettings = textStorm.userSelect;
        if(elem.hasAttribute("data-userselect")){
            uSelectSettings = (elem.dataset.userselect == "true") ? true : false;
        }

        if(!uSelectSettings){
            currentInner.style.userSelect = "none";
            currentInner.style.pointerEvents = "none";
        }

    // DOCUMENT FRAGMENT ELEMS
    const fallingSpan = document.createElement("span");
    fallingSpan.className = "as-fallwrite-span";
    let textCount = 0;
    fallWriteLoop();
    function fallWriteLoop(){
        let tempSpan = fallingSpan.cloneNode(false);
        
            tempSpan.textContent = tempText.charAt(textCount);
        
        
        tempSpan.style.transform = `translateY(${startSettings})`;
        if(opacitySettings === false || opacitySettings == "false"){
            tempSpan.style.animation = `falling_text ${fallSpeed}ms forwards`;  
        } else{
            tempSpan.style.animation = `falling_text_opacity ${fallSpeed}ms forwards`;
        }
        
        currentInner.append(tempSpan);
        textCount++;
        if(textCount<tempText.length){setTimeout(fallWriteLoop, Math.random() * (speedSettings - (speedSettings - 10)) + (speedSettings - 10))}else{
            tempSpan.addEventListener("animationend", ()=>{
                let initialState = textStorm.initialState;
                if(elem.hasAttribute("data-initialstate")){
                    console.log("hey")
                    initialState = (elem.dataset.initialstate == "true");
                }
                if(initialState){
                elem.style.color = window.getComputedStyle(currentInner).color;
                currentInner.remove();
                elem.classList.remove("as-fallwrite");
                textStorm.removeData(elem);
                }   
                
            }); 
        }
    }
   }, 

   rotateWriteIn: (elem)=>{
    // setup
    const tempText =  elem.textContent;
    const textSpan = document.createElement("span");
    textSpan.className = "as-rotatewritespan";
    const innerElem = document.createElement("div");
    innerElem.className = "as-write-inject";
    innerElem.style.textAlign = "left";
    innerElem.style.color = window.getComputedStyle(elem).color;
    elem.append(innerElem);
    elem.style.color="rgba(0,0,0,0)";
    elem.style.opacity = 100;
    const currentInner = elem.querySelector(".as-write-inject"); 
    let textCount = 0;

    // settings

    let opacitySettings = textStorm.rotateWriteOpacity;
    if(elem.hasAttribute("data-opacity")){
        opacitySettings = elem.dataset.opacity;
    }
    let speedSettings = textStorm.rotateWriteSpeed;
    if(elem.hasAttribute("data-writespeed")){
        speedSettings = elem.dataset.writespeed;
    }
    let fallSpeed = textStorm.rotateWriteRotateSpeed;
    if(elem.hasAttribute("data-rotatespeed")){
        fallSpeed = elem.dataset.rotatespeed;
    }
    let startSettings = textStorm.rotateWriteStart;
    if(elem.hasAttribute("data-writestart")){
        startSettings = elem.dataset.writestart;
    }
    let uSelectSettings = textStorm.userSelect;
        if(elem.hasAttribute("data-userselect")){
            uSelectSettings = (elem.dataset.userselect == "true") ? true : false;
        }

        if(!uSelectSettings){
            currentInner.style.userSelect = "none";
            currentInner.style.pointerEvents = "none";
        }

    textSpan.style.transform = `rotate(${startSettings})`;

    rotateWriteLoop();
    function rotateWriteLoop(){
        const tempSpan = textSpan.cloneNode(false);
       
            tempSpan.textContent = tempText.charAt(textCount);
        

        if(opacitySettings === false || opacitySettings == "false"){
            tempSpan.style.animation = `rotate_write ${fallSpeed}ms forwards`;  
        } else{
            tempSpan.style.animation = `rotate_write_opacity ${fallSpeed}ms forwards`;
        }
        currentInner.append(tempSpan);

        textCount++;
        if(textCount<tempText.length){
            setTimeout(rotateWriteLoop, speedSettings);
        }else{
            tempSpan.addEventListener("animationend", ()=>{
                let initialState = textStorm.initialState;
                if(elem.hasAttribute("data-initialstate")){
                    initialState = (elem.dataset.initialstate == "true");
                }
                if(initialState){
                    elem.style.color = window.getComputedStyle(currentInner).color;
                    currentInner.remove();
                    elem.classList.remove("as-rotatewrite");
                    textStorm.removeData(elem);
                }
                
            }); 
        }
    }
   },

   slideWriteIn: (elem)=>{
    // setup
    const tempText =  elem.textContent;
    const textSpan = document.createElement("span");
    textSpan.className = "as-slidewritespan";
    const textInner = document.createElement("div");
    textInner.className = "as-write-inject";
    elem.prepend(textInner);
    const currentInner = elem.querySelector(".as-write-inject");
    currentInner.style.color = window.getComputedStyle(elem).color;
    let textCount = 0;
    elem.style.color = "rgba(0,0,0,0)";
    elem.style.opacity = 100; 
    // settings

    let opacitySettings = textStorm.slideWriteOpacity;
    if(elem.hasAttribute("data-opacity")){
        opacitySettings = elem.dataset.opacity;
    }
    let speedSettings = textStorm.slideWriteSpeed;
    if(elem.hasAttribute("data-writespeed")){
        speedSettings = elem.dataset.writespeed;
    }
    let slideSpeed = textStorm.slideWriteSlideSpeed;
    if(elem.hasAttribute("data-slidespeed")){
        slideSpeed = elem.dataset.slidespeed;
    }
    let startSettings = textStorm.slideWriteStart;
    if(elem.hasAttribute("data-writestart")){
        startSettings = elem.dataset.writestart;
    }
    let strechSettings = textStorm.slideWriteStretchAmount;
    if(elem.hasAttribute("data-stretchamount")){
        strechSettings = elem.dataset.stretchamount;
    }
    let uSelectSettings = textStorm.userSelect;
        if(elem.hasAttribute("data-userselect")){
            uSelectSettings = (elem.dataset.userselect == "true") ? true : false;
        }

        if(!uSelectSettings){
            currentInner.style.userSelect = "none";
            currentInner.style.pointerEvents = "none";
        }

    textSpan.style.transform = `translateX(${startSettings}) skewX(${strechSettings})`;
    
    const tempTextLength = tempText.length;
if(parseFloat(startSettings) > 0){
    currentInner.style.textAlign = "left";
    slideWriteLoopPos();
}else{
    currentInner.style.textAlign = "right";
    slideWriteLoopNeg();
}
    
    function slideWriteLoopNeg(){
        const tempSpan = textSpan.cloneNode(false);
        
            tempSpan.textContent = tempText.charAt(tempTextLength-textCount);
        

        if(opacitySettings === false || opacitySettings == "false"){
            tempSpan.style.animation = `slide_write ${slideSpeed}ms forwards`;  
        } else{
            tempSpan.style.animation = `slide_write_opacity ${slideSpeed}ms forwards`;
        }
        currentInner.prepend(tempSpan);

        textCount++;
        if(textCount<=tempText.length){
            setTimeout(slideWriteLoopNeg, speedSettings);
        }else{
            tempSpan.addEventListener("animationend", ()=>{
                let initialState = textStorm.initialState;
                if(elem.hasAttribute("data-initialstate")){
                    initialState = (elem.dataset.initialstate == "true");
                }
                if(initialState){
                    elem.style.color = window.getComputedStyle(currentInner).color;
                currentInner.remove();
                elem.classList.remove("as-slidewrite");
                textStorm.removeData(elem);
                }
                
            }); 
        }
    }
    function slideWriteLoopPos(){
        const tempSpan = textSpan.cloneNode(false);
        
            tempSpan.textContent = tempText.charAt(textCount);
        

        if(opacitySettings === false || opacitySettings == "false"){
            tempSpan.style.animation = `slide_write ${slideSpeed}ms forwards`;  
        } else{
            tempSpan.style.animation = `slide_write_opacity ${slideSpeed}ms forwards`;
        }
        currentInner.append(tempSpan);

        textCount++;
        if(textCount<tempText.length){
            setTimeout(slideWriteLoopPos, speedSettings);
        }else{
            tempSpan.addEventListener("animationend", ()=>{
                let initialState = textStorm.initialState;
                if(elem.hasAttribute("data-initialstate")){
                    initialState = (elem.dataset.initialstate == "true");
                }
                if(initialState){
                elem.style.color = window.getComputedStyle(currentInner).color;
                currentInner.remove();
                elem.classList.remove("as-slidewrite");
                textStorm.removeData(elem);
                }
            }); 
        }
    }


   },

   waveWriteIn: (elem)=>{
    // SETUP
    let tempText = elem.textContent;
    const textSpan = document.createElement("span");
    textSpan.className = "as-wavewrite-span";
    let textCount = 0;

    const innerElem = document.createElement("div");
    innerElem.className = "as-write-inject";
    innerElem.style.color = window.getComputedStyle(elem).color;
    elem.append(innerElem);
    elem.style.color="rgba(0,0,0,0)";
    elem.style.opacity = 100;
    const currentInner = elem.querySelector(".as-write-inject");
    
    // SETTINGS
    let heightSettings = textStorm.waveWriteHeight;
    if(elem.hasAttribute("data-waveheight")){
        heightSettings = elem.dataset.waveheight;
    }
    let speedSettings = textStorm.waveWriteSpeed;
    if(elem.hasAttribute("data-wavespeed")){
        speedSettings = elem.dataset.wavespeed;
    }
    let animSpeed = textStorm.waveWriteAnimSpeed;
    if(elem.hasAttribute("data-animspeed")){
        animSpeed = elem.dataset.animspeed;
    }
    let opacitySettings = textStorm.waveWriteOpacity;
    if(elem.hasAttribute("data-opacity")){
        opacitySettings = elem.dataset.opacity;
    }
    let directionSettings = textStorm.waveWriteDirection.toLowerCase();
    if(elem.hasAttribute("data-direction")){
        directionSettings = elem.dataset.direction.toLowerCase();
    }
    let uSelectSettings = textStorm.userSelect;
        if(elem.hasAttribute("data-userselect")){
            uSelectSettings = (elem.dataset.userselect == "true") ? true : false;
        }

        if(!uSelectSettings){
            currentInner.style.userSelect = "none";
            currentInner.style.pointerEvents = "none";
        }
    

    let currentAnimation = "";

    // SET INDIVIDUAL ANIMATION INSTANCES
    
        const currentClass = `wavewriteinstance${textStorm.waveWriteInstances}`;
        

        if(opacitySettings === false || opacitySettings == "false"){
            document.getElementById("waveStyles").textContent += `
        @keyframes ${currentClass} {
            0%{transform: translateY(0);}
            50%{transform: translateY(${heightSettings});}
            100%{transform: translateY(0)}
        }
        `; 
        } else{
            document.getElementById("waveStyles").textContent += `
        @keyframes ${currentClass} {
            0%{transform: translateY(0); opacity:0;}
            50%{transform: translateY(${heightSettings});}
            100%{transform: translateY(0); opacity: 100;}
        }
        `;
        

        
        currentAnimation = `${currentClass} ${animSpeed}ms forwards`;
        
        textStorm.waveWriteInstances++;
    }
    const textLength = tempText.length;
    if(directionSettings=="right"){
        currentInner.style.textAlign = "left";
        elem.style.textAlign = "left";
        waveWriteLoopRight();
    }else if(directionSettings=="left"){
        elem.style.textAlign = "right";
        waveWriteLoopLeft();
        
    }
    
    function waveWriteLoopRight(){
        const tempSpan = textSpan.cloneNode(false);
       
            tempSpan.textContent = tempText.charAt(textCount);
        
        tempSpan.style.animation = currentAnimation;
        currentInner.append(tempSpan);

        textCount++;
        if(textCount<tempText.length){
            setTimeout(waveWriteLoopRight, speedSettings);
        }else{
            tempSpan.addEventListener("animationend", ()=>{
                let initialState = textStorm.initialState;
                if(elem.hasAttribute("data-initialstate")){
                    initialState = (elem.dataset.initialstate == "true");
                }
                if(initialState){
                elem.style.color = window.getComputedStyle(currentInner).color;
                currentInner.remove();
                elem.classList.remove("as-wavewrite");
                textStorm.removeData(elem);
                }
            }); 
        }
    }
    
    function waveWriteLoopLeft(){
        
        const currentChar = textLength-textCount;
        const tempSpan = textSpan.cloneNode(false);
        
        
            tempSpan.textContent = tempText.charAt(currentChar);
        
        tempSpan.style.animation = currentAnimation;
        currentInner.prepend(tempSpan);

        textCount++;
        if(textCount<=tempText.length){
            setTimeout(waveWriteLoopLeft, speedSettings);
        }else{
            tempSpan.addEventListener("animationend", ()=>{
                
                let initialState = textStorm.initialState;
                if(elem.hasAttribute("data-initialstate")){
                    initialState = (elem.dataset.initialstate == "true");
                }
                if(initialState){
                elem.style.color = window.getComputedStyle(currentInner).color;
                currentInner.remove();
                elem.classList.remove("as-wavewrite");
                textStorm.removeData(elem);
                }
            }); 
        }
    }


   },

    // CUSTOM TRIGGERS 

    fallWrite: (elem)=>{
        elem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.fallWriteIn(elem);}, elem.dataset.wait): textStorm.fallWriteIn(elem);
    },

    mulWrite: (elem)=>{
        const currentElemText = elem.querySelectorAll(".as-mulwrite-text");
        elem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.mulWriteIn(elem, currentElemText);}, elem.dataset.wait): textStorm.mulWriteIn(elem, currentElemText);
        
    },

    simpleWrite:(elem)=>{
        elem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.simpleWriteStart(elem);}, elem.dataset.wait): textStorm.simpleWriteStart(elem);
    },

    rotateWrite: (elem)=>{
        elem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.rotateWriteIn(elem);}, elem.dataset.wait): textStorm.rotateWriteIn(elem);
    },

    slideWrite: (elem)=>{
        elem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.slideWriteIn(elem);}, elem.dataset.wait): textStorm.slideWriteIn(elem);
    },
    waveWrite: (elem)=>{
        elem.hasAttribute("data-wait")?setTimeout(()=>{textStorm.waveWriteIn(elem);}, elem.dataset.wait): textStorm.waveWriteIn(elem);
    },



    // REMOVE DATA ATTRIBUTES
    removeData: (elem)=>{
        elem.removeAttribute("data-writespeed");
        elem.removeAttribute("data-wait");
        elem.removeAttribute("data-placeholder");
        elem.removeAttribute("data-delay");
        elem.removeAttribute("data-idle");
        elem.removeAttribute("data-color");
        elem.removeAttribute("data-width");
        elem.removeAttribute("data-height");
        elem.removeAttribute("data-offsetv");
        elem.removeAttribute("data-offseth");
        elem.removeAttribute("data-loop");
        elem.removeAttribute("data-afteridle");
        elem.removeAttribute("data-delspeed");
        elem.removeAttribute("data-opacity");
        elem.removeAttribute("data-fallspeed");
        elem.removeAttribute("data-writestart");
        elem.removeAttribute("data-rotatespeed");
        elem.removeAttribute("data-slidespeed");
        elem.removeAttribute("data-stretchamount");
        elem.removeAttribute("data-animspeed");
        elem.removeAttribute("data-waveheight");
        elem.removeAttribute("data-direction");
        elem.removeAttribute("data-wavespeed");
    },


    // OBJECT VARIABLES
    waveWriteInstances: 0,

    
};

textStorm.setup();
// SITE CODE
const isElementXPercentInViewport = function(el, percentVisible) {
    let
      rect = el.getBoundingClientRect(),
      windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
  };
  const textState = {
    myProjectTitle: false,
    myProjectTitleReady: true
};
  document.addEventListener("scroll", ()=>{
    const projectTitle = document.getElementById("projectTitle");
    
    if((isElementXPercentInViewport(projectTitle,100)) && (textState.myProjectTitle === false) && textState.myProjectTitleReady){
        textState.myProjectTitle = true;
        textState.myProjectTitleReady = false;
        setTimeout(() => {
            textState.myProjectTitleReady = true;
        }, 2000);
        textStorm.rotateWrite(projectTitle);
    }else if(!isElementXPercentInViewport(projectTitle,1) && (textState.myProjectTitle === true)){
        textState.myProjectTitle = false;
        projectTitle.style.opacity = "0";
    }
  });