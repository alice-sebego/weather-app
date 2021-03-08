// Handle Hours
let currentHour = new Date().getHours();

const dateBuilder = (timezone) => {
   
    const nowInLocalTime = Date.now()  + 1000 * (timezone / 3600);
    const millitime = new Date(nowInLocalTime);

    let day = millitime.toLocaleString("fr-FR", {weekday: "long"});

    return `${day}`;
}

// Handle Days
let currentDay = dateBuilder(Date.now());

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

let seriesOfDays = weekDays.slice(weekDays.indexOf(currentDay)).concat(weekDays.slice(0, weekDays.indexOf(currentDay)));

export {currentHour, seriesOfDays};