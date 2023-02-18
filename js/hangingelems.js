const hangingElems = {
    // percentage for elems to hang by
    minMax: [15, 40],
    init: ()=>{
        Element.prototype.styles = function(addStyles){
                const elem = this;
                const tempStyles = addStyles.split(";");
                tempStyles.pop();
                const allStyles = [];
                tempStyles.forEach((style)=>{
                    const tempStyles = style.split(":");
                    if(/-/gi.test(tempStyles[0])){
                        const tempStyle = tempStyles[0].split("-");
                        let tempStr = tempStyle[1].slice(1);
                        tempStyles[0] = tempStyle[0] + tempStyle[1].charAt(0).toUpperCase() + tempStr;
                    }
                    allStyles[allStyles.length] = [tempStyles[0].trim(), tempStyles[1].trim()];
                });
                allStyles.forEach((style)=>{
                    elem.style[style[0]] = style[1];
                });
                
            };
        const elems = document.querySelectorAll(".hanging-elem");
        const tempWire = document.createElement("div");
        tempWire.className = "hanging-elem-wire";
        elems.forEach((elem)=>{
            elem.style.marginTop = `${randFloat(hangingElems.minMax[0], hangingElems.minMax[1])}%`;
            let dy = elem.offsetTop;
            const wireElem = tempWire.cloneNode("false");
            wireElem.styles(`margin-top: -${dy}px; height: ${dy}px;`);
            elem.append(wireElem);
            elem.style.top = "-100%";
        });
        window.addEventListener("resize", ()=>{
            elems.forEach((elem)=>{
                let dy = elem.offsetTop;
                const wireElem = elem.querySelector(".hanging-elem-wire");
                wireElem.styles(`margin-top: -${dy}px; height: ${dy}px;`);
            });
        }); 
    }
};
function randFloat(min, max){
    return Math.random() * (max - min) + min;
}
hangingElems.init();