const API_KEYS = "590e0f08b19e245f005b9954e9a9526c";
const tempandcity = document.querySelector(".tempandcity");
const weather = document.querySelector(".weather");

function getWeather(lat, long) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEYS}&units=metric`).then(e => e.json()).then(
        e => {
            const temp = e.main.temp;
            const picture = e.weather[0].main;
            const desc = e.weather[0].description;
            const city = e.name;
            tempandcity.innerText = `${temp}℃ @ ${city}`
            weather.innerText = `${desc}`
        });
};

const options = {
    enableHighAccuracy: true, 
    maximumAge: 30000, 
    timeout: 27000
  };
  
function getLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    position = {lat, long};
    localStorage.setItem("position", JSON.stringify(position));
    getWeather(lat, long)
};

function getError(e) {
   console.log(e);
   Alert.alert("Can't find you.", "So sad");
};

 async function init() {
    console.log("weather")
    let position, lat, long; 
    position = localStorage.getItem("position")
    if (position === null) {
       position = await navigator.geolocation.getCurrentPosition(getLocation, getError, options);
    } else {
       position = JSON.parse(position);
       lat = position.lat;
       long = position.long;
       getWeather(lat, long)
    }
}

init();