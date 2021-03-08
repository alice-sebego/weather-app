// https://openweathermap.org/api/one-call-api
const apiKey = "e1c24fb45d4215b7c791b97fdecc48b9";
const lang = navigator.language.substr(0,2).toLowerCase();

const $hours = document.querySelectorAll(".hour");
const $temperatureDetails = document.querySelectorAll(".temperatureDetails");

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

            console.log(`Heure : ${jsonResponse.hourly[3].dt} | Heure temp ${Math.trunc(jsonResponse.hourly[3].temp)}`);
            console.log(dateBuilder(jsonResponse.hourly[0].dt))
            
            // Call an hour every 3 hours
            let currentHour = new Date().getHours();

            for(let i = 0; i < $hours.length; i++){
                
                let incrHour = currentHour + i * 3;
                
                if(incrHour > 24){
                    $hours[i].innerHTML = incrHour - 24;
                } else if(incrHour === 24){
                    $hours[i].innerHTML = "0";
                } else{
                    $hours[i].innerHTML = incrHour;
                }
                
            }
        }

    } catch(error){
        console.log("error :" + error);
    }
}

const dateBuilder = (timezone) => {
   
    const nowInLocalTime = Date.now()  + 1000 * (timezone / 3600);
    const millitime = new Date(nowInLocalTime);
    const dateFormat = millitime.toLocaleString();

    let day = millitime.toLocaleString("fr-FR", {weekday: "long"});
    let month = millitime.toLocaleString("fr-FR", {month: "long"}); 
    let date = millitime.toLocaleString("fr-FR", {day: "numeric"});
    let year = millitime.toLocaleString("fr-FR", {year: "numeric"}); 
    let hours = millitime.toLocaleString("fr-FR", {hour: "numeric"}); 
    let minutes = millitime.toLocaleString("fr-FR", {minute: "numeric"});

    return `${day} ${date} ${month} ${year} ${hours} ${minutes}`;
}
