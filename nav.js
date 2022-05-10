const hamMenu = document.getElementById("hamMenu");
const mainNav = document.getElementById("mainNav");
const dropNavWrapper = document.getElementById("dropNavWrapper");
let navLinks = document.querySelectorAll(".nav-link-a");

window.addEventListener("resize", ()=>{
    if(window.innerWidth >= 950) {
        mainNav.style.transform = "translateX(0)";
    } else {
        mainNav.style.transform = "translateX(-80px)";
        hamMenu.style.transform = "rotate(0)";
        dropNavWrapper.style.opacity = "0";
        hamMenu.setAttribute("value", "0");
        navLinks.forEach(
            (record) => {record.onclick = null});
        setTimeout(() => {dropNavWrapper.style.top = "-100vh";}, 500);
    }
});

dropNavWrapper.addEventListener("click",()=>{
    hamMenu.style.transform = "rotate(0)";
        mainNav.style.transform = "translateX(-80px)";
        dropNavWrapper.style.opacity = "0";
        hamMenu.setAttribute("value", "0");
        navLinks.forEach(
            (record) => {record.onclick = null});
        setTimeout(() => {dropNavWrapper.style.top = "-100vh";}, 500);
});

hamMenu.addEventListener("click", () =>{
    if(hamMenu.getAttribute("value") == "0"){
        hamMenu.style.transform = "rotate(90deg)";
        mainNav.style.transform = "translateX(0)";
        dropNavWrapper.style.top = "0";
        dropNavWrapper.style.opacity = "1";
        // SET NAV LINKS CLOSE HANDLER
        navLinks.forEach(
            (record) => {record.onclick = ()=>{hamMenu.style.transform = "rotate(0)";
        mainNav.style.transform = "translateX(-80px)";
        dropNavWrapper.style.opacity = "0";
        hamMenu.setAttribute("value", "0");
        navLinks.forEach(
            (record) => {record.onclick = null});
        setTimeout(() => {dropNavWrapper.style.top = "-100vh";}, 500);}}
        );
        hamMenu.setAttribute("value", "1");
    } else {
        mainNav.style.transform = "translateX(-80px)";
        hamMenu.style.transform = "rotate(0)";
        dropNavWrapper.style.opacity = "0";
        hamMenu.setAttribute("value", "0");
        navLinks.forEach(
            (record) => {record.onclick = null});
        setTimeout(() => {dropNavWrapper.style.top = "-100vh";}, 500);
        
    }

});

