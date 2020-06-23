const weatehr = document.querySelector(".js-weather");

const API_KEY = ""

const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weatehr.innerHTML = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObj) {
localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
loadCoords();
}
init();