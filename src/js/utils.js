// Handle Hours
let currentHour = new Date().getHours();

// Handle Days

let today = new Date();

let currentDay = today.toLocaleDateString("fr-FR", {weekday: "long"});

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

let seriesOfDays = weekDays.slice(weekDays.indexOf(currentDay)).concat(weekDays.slice(0, weekDays.indexOf(currentDay)));

export {currentHour, seriesOfDays};