// JAVASCRIPT DEVELOPER TOOLS

"use strict";

// function randInt(min, max){
//     return Math.floor(Math.random() * ((max + 1) - min) + min);
// }

// // STRING PROTOTYPES

// // Word Count
// String.prototype.wordCount = function(){
//     if(/[0-9a-z]{1,}/gi.test(this)){
//         return this.match(/[0-9a-z]{1,}/gi).length;
//     }else{
//         return 0;
//     }
    
// };

// String.prototype.wordsToUpperCase = function(){
//     return(this.replace(/[a-z]{1,}(?!\w)/gi, (match)=>{
//         let tempStr = match.slice(1);
//         let tempUp = match.charAt(0).toUpperCase();
//         return tempUp + tempStr;
//     }));
    
// };

// PARSE STRING TO ARRAY (SUPPORTS NUMERIC/STRING VALUES/Boolean) USEFUL FOR DATA ATTRIBUTES and storing arrays in LocalStorage
String.prototype.parseArray = function() {
    const str = this;
    if(/((?<=\[).*(?=\])|(.{1,}))/.test(str)){
    const arrayRegEx = /(((?<!\[).*(?<=\[))[^\]\[]*((?=\]).*(?!\]))|.{1,})/;
    const match = str.match(arrayRegEx)[0];
    const nArr = match.split(/([-\de+]*\.[-\de+]*|[-\de+]{1,}|"[^"]{1,}"|'[^']{1,}'|`[^`]{1,}`)(?=[,]*)|(?<=[,]*[ ]*)([\de]{1,}|"[^"]{1,}"|'[^']{1,}'|`[^`]{1,}`|true|false)/gi);
    nArr.splice(0,1);
    nArr.splice(nArr.length - 1, 1);
    let loopAmt = nArr.length;
    // STRING/Numeric/Bool Conversion
    for(let i = 0; i < loopAmt; i++){
        if(/((?<=')[^']*(?=')|(?<=")[^"]*(?=")|(?<=`)[^`]*(?=`))/.test(nArr[i])){
            nArr[i] = nArr[i].match(/((?<=')[^']*(?=')|(?<=")[^"]*(?=")|(?<=`)[^`]*(?=`))/)[0];
        }else if(!isNaN(parseFloat(nArr[i]))){
            nArr[i] = parseFloat(nArr[i]);
        } else if(/true|false/gi.test(nArr[i])){
            nArr[i] = ((`${nArr[i]}`).toLowerCase() == "true") ? true : false;
        }
    }
        // FILTER
        
         loopAmt = nArr.length;
        for(let i = 0; i < loopAmt; i++){
            if((!/^[,'`"]*[ ]*[^'`",\s]/gi.test(nArr[i]))||(nArr[i] == null)){
                nArr.splice(i,1);
                i--;
                loopAmt--;
            }
        }
    
    return nArr;
    } else{
        console.log("parseArray Error: No Array Detected");
    }
};


// ARRAY PROTOTYPES

// // SORT TARGET ARRAY IN A RANDOM ORDER
// Array.prototype.sortRandom = function(){
//     const arrayLength = this.length;
//     const arrayRefs = [];
//     const outputArray = [];

//     for(let i = 0; i < arrayLength; i++){
//         arrayRefs.push(i);
//     }
//     for(let i = 0; i < arrayLength; i++){
//         const currentNum = Math.floor(Math.random() * (arrayRefs.length - 0) + 0);
//         outputArray.push(this[arrayRefs[currentNum]]);
//         arrayRefs.splice(currentNum, 1);
//     }
//     return outputArray;
// };

//Parses an array object into a string that is readable by String.parseArray();
Array.prototype.parseString = function(){
    const arrLength = this.length;
    let nStr = "";
    for(let i = 0; i < arrLength; i++){
        if(typeof this[i] == "string"){
            this[i] = "\`" + this[i] + "\`";
        }
        if(i == arrLength - 1){
            nStr += this[i];
        }else{
            nStr += `${this[i]}, `;
        }  
    }
    return (`[${nStr}]`);
};


// OBJECT PROTOTYPES
// Object.prototype.isObject = function(){
//     return (Object.prototype.toString.call(this) == "[object Object]")? true : false ;
// };

// // ELEMENT METHODS/PROTOTYPES
// const titleElem = {
//     // Interval Speed in MS
//     intervalSpeed: 3000,

//     /*
//     Description:
//     Changes title Element's textContent

//     Syntax:
//     titleElem.set(param_1, param_2);
    
//     Parameters:
//     param_1 is the text to be displayed in the title element.
//     param_2 is an optional boolean value, if set to 'true' the title element's text will change between the old text and the new text on an interval. Default is 'false'.
// */
//     set: (...args)=>{
//         const DOMTitle = document.getElementsByTagName("title")[0];
//         if(args[1] != null && args[1] === true){
//             const titles = [DOMTitle.textContent, args[0]];
//             let selected = 0;
//             changeTitle();
//             setInterval(changeTitle, titleElem.intervalSpeed);
//             function changeTitle(){
//                 DOMTitle.textContent = titles[selected];
//                 if(selected == 1){
//                     selected = 0;
//                 }else{
//                     ++selected;
//                 }
//             }
//         }else{
//             DOMTitle.textContent = args[0];
//         }
//     }
// };

// // Add multiple styles to a element's style tag
// 