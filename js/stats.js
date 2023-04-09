let settings;
        /*
        settings = [timesVisited, WeatherUnits, userLatitude, userLongitude, userCity, userCountry]
        */

        // FIRST RUN
        if(!localStorage.getItem("settings")){
            // DEFAULT SETTINGS
            localStorage.setItem("settings", JSON.stringify([0, 'c', false, false, false, false]));
        }
        settings = JSON.parse(localStorage.getItem("settings"));

        ++settings[0];
        updateSettings();
        const timesVisited = settings[0];
        
        
        
        // TIMES VISITED
        if(timesVisited == 1){
            document.getElementById("timesVisited").innerHTML = "<div>You've visited this page <span>1</span> time!</div>";
        }else{
            document.getElementById("timesVisited").innerHTML = `<div>You've visited this page <span>${timesVisited}</span> times!</div>`;
        }

        function updateSettings(){
            localStorage.setItem("settings", JSON.stringify([...settings]));
        }


        // WEATHER UNIT COORDS
        switch(settings[1]){
            case "f":
                document.getElementById("weatherUnitF").setAttribute("selected", "");
            break;
            case "c":
                document.getElementById("weatherUnitC").setAttribute("selected", "");
            break;
        }

        function toFahrenheit(cel){
            return ((cel * 1.8) + 32)
        }

        const weatherUnits = document.getElementById("weatherUnits");
        weatherUnits.setAttribute("data-weatherunits", settings[1]);
        const weatherUnitsSelect = document.getElementById("weatherUnitsSelect");
        const weatherTemp = document.getElementById("weatherTemp");

        weatherUnitsSelect.addEventListener("change", ()=>{
                    settings[1] = weatherUnitsSelect.value;
                    updateSettings();
                    weatherUnits.setAttribute("data-weatherunits", settings[1]);

                    const weatherUnitsText = document.querySelector("#weatherTemp span");
                    switch(settings[1]){
                        case "f":
                            weatherUnitsText.textContent = toFahrenheit(parseFloat(weatherTemp.dataset.weatherval)).toFixed(0);
                        break;
                        case "c":
                            weatherUnitsText.textContent = (parseFloat(weatherTemp.dataset.weatherval)).toFixed(0);
                        break;
                    }
                    
        });
        
            