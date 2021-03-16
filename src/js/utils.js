// Handle Hours
let currentHour = new Date().getHours();

// Handle Days
let today = new Date();

let currentDay = today.toLocaleDateString("fr-FR", {weekday: "long"});

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

let seriesOfDays = weekDays.slice(weekDays.indexOf(currentDay)).concat(weekDays.slice(0, weekDays.indexOf(currentDay)));

/**
 * Handle Content's tables when screen's width < 700 px
 * @param {HTMLTableElement} tableresponsive 
 */
const responsiveContentsTheadTable = (tableresponsive) => {
    tableresponsive.forEach(table => {
        let labels = Array.from(table.querySelectorAll('th')).map(th => {
            return th.innerText;
        });
        table.querySelectorAll('td').forEach((td, i) => {
            td.setAttribute('data-label', labels[i % labels.length])
        });
    });
    
}

/**
 * Handle Background's body depending day's time
 * @param {number} hour 
 * @param {HTMLDivElement} video 
 * @param {HTMLElement} element 
 * @param {HTMLVideoElement} day 
 * @param {HTMLVideoElement} night 
 */
const switchBackgroundBody = (hour, video, element, day, night) => {
    if(hour >= 6 && hour < 20){
        video.innerHTML = day;
        element.prepend(video);
    } else {
        video.innerHTML = night;
        element.prepend(video);
    }
}

export {currentHour, seriesOfDays, responsiveContentsTheadTable, switchBackgroundBody};

