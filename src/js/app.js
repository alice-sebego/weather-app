const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const error = (err) => console.warn(`ERREUR (${err.code}): ${err.message}`);

navigator.geolocation.getCurrentPosition( pos => {
    
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        
        console.log(latitude);
        console.log(longitude);

    }, 
    error, 
    options
);

const apiKey = "e1c24fb45d4215b7c791b97fdecc48b9";

// https://openweathermap.org/api/one-call-api
const endpointOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current&appid=${apiKey}`;