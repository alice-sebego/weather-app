import {currentHour, seriesOfDays, responsiveContentsTheadTable, switchBackgroundBody} from './utils.js';
import apiKey from './api-key.js';

// DOM's elements
const $main = document.querySelector("main"); 
const $hours = document.querySelectorAll(".hour");
const $temperatureDetails = document.querySelectorAll(".temperatureDetails");
const $days = document.querySelectorAll(".day");
const $temperaturesDay = document.querySelectorAll(".temperatureDay");
const $tableResponsive = document.querySelectorAll(".table-responsive");
const $resultsTable = document.querySelector("#results-table");

const lang = navigator.language.substr(0,2).toLowerCase();

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const error = (err) => console.warn(`ERREUR (${err.code}): ${err.message}`);

navigator.geolocation.getCurrentPosition( pos => {
    
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
    
        const endpointOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${apiKey}&lang=${lang}&units=metric`;
        getOpenWeather(endpointOpenWeather);

    }, 
    error, 
    options
);

const getOpenWeather = async (url) =>{
    try{
        const response = await fetch(url);
        if(response.ok){
            let jsonResponse = await response.json();
            
            const imgWeather = document.querySelector("#imgWeather");
            imgWeather.innerHTML = `<img src="http://openweathermap.org/img/wn/${jsonResponse.current.weather[0].icon}@2x.png">`;
            
            const descriptionWeather = document.querySelector("#description-weather");
            descriptionWeather.innerHTML = `${jsonResponse.current.weather[0].description}`;
            
            const currentTemperature = document.querySelector("#current-temperature");
            currentTemperature.innerHTML = `${Math.trunc(jsonResponse.current.temp)}`;

            const timeZone = document.querySelector("#timezone");
            timeZone.innerHTML = `${jsonResponse.timezone}`;
            
            // Call hour every 3 hours
            for(let i = 0; i < $hours.length; i++){
                
                let incrHour = currentHour + i * 3;
                
                if(incrHour > 24){
                    $hours[i].innerHTML = incrHour - 24 + " h";
                } else if(incrHour === 24){
                    $hours[i].innerHTML = "0 h";
                } else {
                    $hours[i].innerHTML = incrHour + " h";
                }
                
            }

            // Call temperature's forecast every 3 hours
            for(let j = 0; j < $temperatureDetails.length; j++){

                $temperatureDetails[j].innerHTML = `${Math.trunc(jsonResponse.hourly[j * 3].temp)}`;
            }

            // Call next days
            for(let k = 0; k < seriesOfDays.length; k++){
                $days[k].innerHTML = seriesOfDays[k].slice(0, 3);  
             
            }

            responsiveContentsTheadTable($tableResponsive);

            // Call temperature's next days
            for(let l = 0; l < $temperaturesDay.length; l++){

                $temperaturesDay[l].innerHTML = `${Math.trunc(jsonResponse.daily[l + 1].temp.day)} °C</br>
                <img class="img-next-weather" src="http://openweathermap.org/img/wn/${jsonResponse.daily[l + 1].weather[0].icon}@2x.png">`;
            }

        } 

    } catch(error){

        console.log("error :" + error);
        $resultsTable.style.display = "none";
        const errorSection = document.createElement("section");
        errorSection.classList.add("error-section");
        errorSection.innerHTML = `<p>Ooops ! Nous n'avons pas pu charger de données depuis notre fournisseur de données</p>`;
        $main.appendChild(errorSection); 

    }
}

// Handle Background's body depending day's time
const $video = document.createElement("div");

const dayTime = `<video autoplay muted loop id="video-bg">
<source src="./src/video/Blue-Sky-Courtesy-Pixabay.mp4" type="video/mp4">
</video>`;

const nightTime = `<video autoplay muted loop id="video-bg">
<source src="./src/video/Sky-Night-Courtesy-Dom-Le-Roy.mp4" type="video/mp4">
</video>`; 

switchBackgroundBody(currentHour, $video, $main, dayTime, nightTime);

