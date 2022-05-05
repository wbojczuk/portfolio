// DROPDOWN NAV
document.getElementById("hamMenu").addEventListener("click", function(){
    const dropNav = document.getElementById("dropNav");
    const hamMenu = document.getElementById("hamMenu");
    document.getElementById("dropNavWrapper").addEventListener("click",function(){
      hamMenu.style.transform = "rotate(0) translateY(20%)";
      dropNav.style.animation = "0.5s dropnav_up";
      document.getElementById("dropNavWrapper").style.transition = "opacity 0.5s ease-in-out";
      document.getElementById("dropNavWrapper").style.opacity = "0";
      dropNav.onanimationend = function(){
        document.getElementById("dropNavWrapper").style.top = "-100vh";
        document.getElementById("dropNav").style.display = "none";
      };
    });
    if(dropNav.style.getPropertyValue("display") == "none"){
      document.getElementById("dropNavWrapper").style.top = "0";
      document.getElementById("dropNavWrapper").style.transition = "opacity 0.6s ease-in-out";
      dropNav.onanimationend = null;
      dropNav.style.display = "inline-block";
      document.getElementById("dropNavWrapper").style.opacity = "1";
      dropNav.style.animation = "0.6s dropnav_down forwards";
      hamMenu.style.transform = "rotate(90deg) translateX(20%)";
      
    } else {
      
      hamMenu.style.transform = "rotate(0) translateY(20%)";
      dropNav.style.animation = "0.5s dropnav_up";
      document.getElementById("dropNavWrapper").style.transition = "opacity 0.5s ease-in-out";
      document.getElementById("dropNavWrapper").style.opacity = "0";
      dropNav.onanimationend = function(){
        document.getElementById("dropNavWrapper").style.top = "-100vh";
        document.getElementById("dropNav").style.display = "none";
      };
      
      
    }
    
  });

  document.getElementById("closeDropNav").addEventListener("click", function(){
  
    const dropNav = document.getElementById("dropNav");
    const hamMenu = document.getElementById("hamMenu");
    document.getElementById("dropNavWrapper").style.transition = "opacity 0.5s ease-in-out";
    document.getElementById("dropNavWrapper").style.opacity = "0";
    dropNav.style.animation = "0.5s dropnav_up";
    dropNav.onanimationend = function(){
      document.getElementById("dropNavWrapper").style.top = "-100vh";
      
      document.getElementById("dropNav").style.display = "none";
    };
    hamMenu.style.transform = "rotate(0) translateY(20%)";
  });