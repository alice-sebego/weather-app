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
    
        const endpointOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`;
        getOpenWeather(endpointOpenWeather);

    }, 
    error, 
    options
);

const apiKey = "e1c24fb45d4215b7c791b97fdecc48b9";

// https://openweathermap.org/api/one-call-api


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
            currentTemperature.innerHTML = `${jsonResponse.current.temp}`;

            const timeZone = document.querySelector("#timezone");
            timeZone.innerHTML = `${jsonResponse.timezone}`;

        }

    } catch(error){
        console.log("error :" + error);
    }
}