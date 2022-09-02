let particleState = 0;
setTimeout(function(){dropText(document.getElementById("main2"))}, 500);
function dropText(elem){
  let counter = 0;
  const dropSpans = elem.querySelectorAll("span");
  const dropLength = dropSpans.length;
  dropLoop()
  function dropLoop(){
    dropSpans[counter].style.animation = "text_down 0.2s forwards";
    if(counter < dropSpans.length - 1){
      counter++;
      setTimeout(dropLoop, 50)
      
    }
  }
}

// FLIP TEXT
const mainDescription = document.getElementById("mainDescription");
let once = 1;
let oncee = 1;
let mainDescText = document.getElementById("mainDescription").textContent;
document.querySelector(".main2 span:nth-child(19)").addEventListener("animationend", function(){
  mainDescription.style.opacity = "1";
  writeText(mainDescription, mainDescText);
});

function flipText(elem, text) {
    let counter = 1;
   let textLength = text.length;
   let mainText = text;
   let BuiltText = "";
   let output = "<span style='transform: scale(1, 1);'>" + BuiltText + "</span>"; 
   FlipLoop();
   function FlipLoop() {
     mainText = text.slice(counter);
       BuiltText = text.slice(0,counter);
       output = "<span style='display: inline-block;transform: scale(-1);'>" + BuiltText + "</span>";
    elem.innerHTML = output + mainText;
    if (counter < textLength) {
        counter++
        setTimeout(FlipLoop, 50);
        
    }
   }
}

function writeText(elem, text) {
    let counter = 1;
   let textLength = text.length;
   let mainText = text;
   let BuiltText = "";
   writeLoop();
   function writeLoop() {
     mainText = text.slice(counter);
       BuiltText = text.slice(0,counter);
    elem.innerHTML = BuiltText;
    if (counter < textLength) {
        counter++
        setTimeout(writeLoop, 30);
        
    }
   }
}

// SECOND CARDS SECTION WAIT

document.addEventListener("scroll", function(){
const section2Cards = document.getElementById("sect2test");

let testTwo = isInViewport(document.getElementById("mainDownArrow"))

if(testTwo!==true&&particleState==0){
  particleState=1;
  flurryStorm.pause();
}

if(testTwo==true&&particleState==1){
  particleState=0;
  flurryStorm.resume();
}

let test = isInViewport(section2Cards);
if(test == true && once == 1){
  section2Animations();
  once++
}
});

// THIRD SECTION WAIT

// document.addEventListener("scroll", function(){
//   const section3 = document.getElementById("sec3Test");
//   let test = isInViewport(section3);
//   if(test == true && oncee == 1){
//     section3Animations();
//     oncee++
//   }
//   });


function section2Animations(){
  //document.querySelector(".cloud1").style.animation = "cloud_slide 1s forwards";
  //document.querySelector(".cloud3").style.animation = "cloud_slide 1.1s forwards";
//document.querySelector(".cloud2").style.animation = "cloud_slide 0.7s forwards";
  let cardTitles = document.querySelectorAll(".card-title");
  for(let i = 0; i < cardTitles.length; i++) {
    flipText(cardTitles[i], cardTitles[i].textContent);
    cardTitles[i].classList.add("card-underline-anim");
  }

  let cardLists = document.querySelectorAll(".card-list");
  let counter = 0;
  for(let i = 0; i < cardLists.length; i++){
    let cardSpans = cardLists[i].querySelectorAll("span");
    for(let o = 0; o < cardSpans.length; o++){
      
      cardSpans[o].style.animation = "textfade 0.5s "+ counter +"s forwards cubic-bezier(0.011, 0, 0.5, 0)";
      counter += 0.1;
    }

  }

}

// function section3Animations(){

//   let projectDesc = document.querySelectorAll(".project-desc");
//   for(let i = 0; i < projectDesc.length; i++){
//     projectDesc[i].classList.add("slide-in");
    

//   }
//   let projectTitle = document.querySelectorAll(".project-title");
//   for(let i = 0; i < projectTitle.length; i++){
//     projectTitle[i].classList.add("project-title-anim");
    

//   }
  
// }

// VIEWPORT CHECKS
function isInViewport(elem) {
  const test = elem.getBoundingClientRect();
  return (
    test.top >= 0 &&
    test.left >= 0 &&
    test.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    test.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
