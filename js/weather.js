let wUnits = weatherUnits.dataset.weatherunits;
let userLatLong = [];

const fetchState = {
    weather: false,
    geoData: false,
    searchTimer: null,
}

const weatherCodes = {
    clear: [0],
    partial_cloudy: [1,2],
    cloudy: [45,48,3],
    drizzle: [51, 53, 55, 56, 57],
    rain: [61, 63, 65],
    freezing_rain: [66, 67],
    snow: [71, 73, 75, 77],
    rain_shower: [80,81,82],
    snow_shower: [85, 86],
    thunder_storm: [95, 96, 99]
};

// Main Weather Function
function getCoords(type){
    // Pulls data from LocalStorage
    if(type == "saved"){
        getWeatherData(settings[2], settings[3]);
        userLatLong = [settings[2], settings[3]];
        displayLocationName("saved");
    }else 
    if(type == "getloc"){
        // Ask Client for Location if Available
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                // If Location Allowed
                settings[2] = pos.coords.latitude;
                settings[3] = pos.coords.longitude;
                updateSettings();
                getWeatherData(pos.coords.latitude, pos.coords.longitude);
                getLocationName({lat: pos.coords.latitude, long: pos.coords.longitude});
                userLatLong = [pos.coords.latitude, pos.coords.longitude];
            }, ()=>{
                // If Location Not Allowed
                getWeatherData(-27.713843, 29.997177);
                userLatLong = [-27.713843, 29.997177];
                settings[2] = -27.713843;
                settings[3] = 29.997177;
                updateSettings();
                displayLocationName("default")});
  }
    // Get Weather about default location 
}else if(type == "default"){
        getWeatherData(-27.713843, 29.997177);
        userLatLong = [-27.713843, 29.997177];
        settings[2] = -27.713843;
        settings[3] = 29.997177;
        updateSettings();
        displayLocationName("default");
}else{
    // Custom location in the form of an object
    getWeatherData(type.latitude, type.longitude);
    userLatLong = [type.latitude, type.longitude];
    settings[2] = type.latitude;
    settings[3] = type.longitude;
    updateSettings();
    displayLocationName({city: type.city, country: type.country});
  }
}

// Fetch Weather Data Via open-meteo API
function getWeatherData(lat, long){
    if(!fetchState.weather){
    fetchState.weather = true;
    fetch (`http://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&daily=temperature_2m_max&daily=sunrise&daily=sunset&timezone=auto`)
    .then((res)=>res.json())
    .then((data)=>{showWeatherData(data); fetchState.weather = false;});
    }
}

// Display Weather Data In DOM
function showWeatherData(weather){
    // Set Temperature
    let weatherTemp = weather.current_weather.temperature;
    const tempElem = document.getElementById("weatherTemp");
    tempElem.setAttribute("data-weatherval", weatherTemp);
    if(settings[1] == "f"){
        weatherTemp = toFahrenheit(weatherTemp);
    }
    tempElem.innerHTML = `<span>${(weatherTemp).toFixed(0)}</span>`;  
    
    // Set WeatherIcon
    const weatherType = document.getElementById("weatherType");
    const weatherCode = weather.current_weather.weathercode;
    for(const property in weatherCodes){
        if(property != "isObject"){
        if(weatherCodes[property].includes(weatherCode)){
            if((property == "partial_cloudy") || (property == "clear")){
                const sunrise =  new Date(weather.daily.sunrise[0]).getHours();
                const sunset =  new Date(weather.daily.sunset[0]).getHours();
                // get day/night
                const currentTime = new Date(weather.current_weather.time).getHours();
                if(currentTime>=sunrise && currentTime < sunset){
                    // If Day
                    weatherType.style.backgroundImage = `url("./img/weather/${property}_day.svg")`;
                }else{
                    // If Night
                    weatherType.style.backgroundImage = `url("./img/weather/${property}_night.svg")`;
                }
                
            }else{
                weatherType.style.backgroundImage = `url("./img/weather/${property}.svg")`;
            }
        }
    }
}
}


function toFahrenheit(cel){
    return ((cel * 1.8) + 32)
}
function toCelcius(far){
    return ((far - 32) / 1.8)
}

// Get Geographical data about co-ords using opencagedata API (AutoDetect Loaction)
function getLocationName(loc){
    fetch (`https://api.opencagedata.com/geocode/v1/json?key=37bda152db014c79a8f883a28053c61e&q=${loc.lat}%2C+${loc.long}&pretty=1&no_annotations=1`)
    .then((res)=>res.json())
    .then((data)=>{
        displayLocationName(data);
    });
    
}

// Display Geographical Data On DOM
function displayLocationName(loc){
    let city = "", country = "";

    if(loc == "default"){
        // If not in LocalStorage and user denied location
         city = "Newcastle,&nbsp;";
         country = "South Africa";
         settings[5] = "South Africa";
         settings[4] = "Newcastle,&nbsp;";
         updateSettings();
    }else if(loc == "saved"){
        // If in LocalStorage
        if(settings[4] != false){
            city = settings[4];
        }
        if(settings[5] != false){
            country = settings[5];
        }
    }else if(loc.thanks){
        // If Not in LocalStorage and user allowed location
         if(loc.results[0].components.country){
            country = loc.results[0].components.country;
            settings[5] = country;
         }else{
            settings[5] = false;
         }
         if(loc.results[0].components.town){
            city = loc.results[0].components.town + ",&nbsp;";
            settings[4] = city;
         }else{
            settings[4] = false;
         }
         updateSettings();
    }else{
        city = loc.city;
         country = loc.country;
         settings[5] = loc.country;
         settings[4] = loc.city;
         updateSettings();
    }
    const locElem = document.getElementById("weatherLocation");
    locElem.innerHTML = `<div class="loc-wrapper"><div class="city">${city}</div><div class="country">${country}</div></div>`;
}

// Onload Run
if(settings[3] != false){
    getCoords("saved");
}else{
    getCoords("default");
}
// Refresh Button Listener
document.querySelector("#refreshLoc button").addEventListener("click", ()=>{getCoords("getloc")});

// Refresh Weather Every Minute
setInterval(
()=>{
    getWeatherData(userLatLong[0], userLatLong[1]);
}
,60000);


const searchLocInput = document.getElementById("searchLocInput");
const searchLocButton = document.querySelector("#searchLoc button");
const searchLocList = {
    elem: document.querySelector("#searchLoc ul"),
    isOpen: false,
    clicked: false,

    open: ()=>{
        searchLocList.elem.style.display = "inline-block";
        searchLocList.isOpen = true;
    },
    close: ()=>{
        searchLocList.elem.style.display = "none";
        searchLocList.elem.innerHTML = "";
        searchLocInput.value = "";
        searchLocList.isOpen = false;
    }
};

searchLocList.elem.addEventListener("mousedown", ()=>{
    searchLocList.clicked = true;
});
window.addEventListener("mouseup", ()=>{
    searchLocList.clicked = false;
});
window.addEventListener("click", ()=>{
    if(!searchLocList.clicked && searchLocList.isOpen){
        searchLocList.close();
    }
});

searchLocButton.addEventListener("click", ()=>{
    getGeoData(searchLocInput.value);
});

searchLocInput.addEventListener("input", ()=>{
    if(searchLocInput.value == ""){
        clearTimeout(fetchState.searchTimer);
        searchLocList.close();
    }else{
        getGeoData(searchLocInput.value);
         // FORCE REFRESH 1 SECOND AFTER LAST KEYPRESS
        clearTimeout(fetchState.searchTimer);
        fetchState.searchTimer = setTimeout(()=>{
            fetchState.geoData = false;
            getGeoData(searchLocInput.value);
        },500);
    }
   
});


searchLocInput.addEventListener("keypress", (evt)=>{
    if(evt.key == "Enter"){
        getGeoData(searchLocInput.value); 
    }
});

// Get Co-Ords from human readable location
function getGeoData(searchStr){
    if(!fetchState.geoData){
        fetchState.geoData = true;
        fetch (`http://geocoding-api.open-meteo.com/v1/search?name=${searchStr}`)
        .then((res)=>res.json())
        .then((data)=>{parseGeoData(data); fetchState.geoData = false;});
        }
}

// Parse Results into a list
function parseGeoData(data){
    searchLocList.elem.innerHTML = "";
    if(data.results){
        const results = data.results;
        const templateLi = document.createElement("li");
        // create list
        searchLocList.open();
        
        results.forEach(result => {
            const tempLi = templateLi.cloneNode(false);
            let city = "", country = "", state = "";
            if(result.admin1){
                state = result.admin1 + ",&nbsp;";
            }
            if(result.name){
                city = result.name + ",&nbsp;";
            }
            if(result.country_code){
                country = result.country_code;
            }
            tempLi.innerHTML = `${city}${state}${country}`;

            tempLi.addEventListener("click", ()=>{
                clearTimeout(fetchState.searchTimer);
                getCoords({
                    latitude: result.latitude,
                    longitude: result.longitude,
                    city: city,
                    country: result.country,
                });
                searchLocList.close();
                
            });

            searchLocList.elem.append(tempLi);
        });

        // POPULATE LIST
    }else{
        searchLocList.elem.insertAdjacentHTML("beforeend", "<li>No Results</li>");
    }
}
