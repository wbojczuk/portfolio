"use strict";

const dateTopBar = {
    init: ()=>{
        //Styles
        const barStyles = document.createElement("style");
        barStyles.textContent = `
        #dateTopBar{
            display: flex;
            position: absolute;
            top:0;
            left:0;
            align-items: center;
            justify-content: right;
            width: 100vw;
            height: 2vw;
            background: #8E0E00;
            background: -webkit-linear-gradient(to right, #1F1C18, #8E0E00);
            background: linear-gradient(to right, #4286f4, #373b44);
            z-index: 10;
        }
        #dateTopBar span{
            margin-right: 15%;
            color: white;
            font-size: 1vw;
            font-family: monospace;
            font-weight: 400;
            letter-spacing: .01em;
        }
        /* Mobile Styles */
@media only screen and (max-width: 900px) {
    #dateTopBar{
        height: 3vh;
        top: -2.5vh;
    }
    #dateTopBar span{
        font-size: 2vh;
    }
}
        `;
        document.getElementsByTagName("head")[0].append(barStyles);

        const dateBar = document.getElementById("dateTopBar");
        const curDate = new Date();
        const newSpan = document.createElement("span");
        let month = "";
        switch (curDate.getMonth()){
            case 0: month = "January";
            break;
            case 1: month = "February";
            break;
            case 2: month = "March";
            break;
            case 3: month = "April";
            break;
            case 4: month = "May";
            break;
            case 5: month = "June";
            break;
            case 6: month = "July";
            break;
            case 7: month = "August";
            break;
            case 8: month = "September";
            break;
            case 9: month = "October";
            break;
            case 10: month = "November";
            break;
            case 11: month = "December";
            break;
        }
        newSpan.textContent = `${month} ${curDate.getDate()}, ${curDate.getFullYear()} - ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`;
        dateBar.innerHTML = "";
        dateBar.append(newSpan);
        
    }
};
setInterval(dateTopBar.init, 1000)
dateTopBar.init();