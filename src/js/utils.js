// Handle Hours
let currentHour = new Date().getHours();

// Handle Days

let today = new Date();

let currentDay = today.toLocaleDateString("fr-FR", {weekday: "long"});

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

let seriesOfDays = weekDays.slice(weekDays.indexOf(currentDay)).concat(weekDays.slice(0, weekDays.indexOf(currentDay)));

// Handle Content's tables when screen's width < 700 px

const responsiveContentsTheadTable = (tableresponsive) =>{
    tableresponsive.forEach(table => {
        let labels = Array.from(table.querySelectorAll('th')).map(th => {
            return th.innerText
        })
        table.querySelectorAll('td').forEach((td, i) => {
            td.setAttribute('data-label', labels[i % labels.length])
        })
    })
}
export {currentHour, seriesOfDays, responsiveContentsTheadTable};

