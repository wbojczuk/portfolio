const hangingElems = {
    // percentage for elems to hang by
    minMax: [15, 40],
    init: ()=>{
        const elems = document.querySelectorAll(".hanging-elem");
        const tempWire = document.createElement("div");
        tempWire.className = "hanging-elem-wire";
        elems.forEach((elem)=>{
            elem.style.marginTop = `${randFloat(hangingElems.minMax[0], hangingElems.minMax[1])}%`;
            let dy = elem.offsetTop;
            const wireElem = tempWire.cloneNode("false");
            wireElem.styles(`top: -${dy}px; height: ${dy}px;`);
            elem.append(wireElem);
        });
        window.addEventListener("resize", ()=>{
            elems.forEach((elem)=>{
                let dy = elem.offsetTop;
                const wireElem = elem.querySelector(".hanging-elem-wire");
                wireElem.styles(`top: -${dy}px; height: ${dy}px;`);
            });
        }); 
    }
};
function randFloat(min, max){
    return Math.random() * (max - min) + min;
}
hangingElems.init();