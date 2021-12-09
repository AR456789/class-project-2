//1.
let currentTime = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentTime.getDay()];

let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let getTime = document.querySelector("#time");

getTime.innerHTML = `${day} ${hour}:${minute}`;

//2.
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");

  let cityName = document.querySelector("#city-name");
  if (cityInput.value) {
    cityName.innerHTML = `${cityInput.value}`;
  } else {
    cityName.innerHTML = null;
    alert("Please type a city name");
  }
}
let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", citySearch);

// week 8 forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
      src=""
      alt=""
      width="42"
      />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperatures-max"> 18 </span>
      <span class="weather-forecast-temperatures-min"> 18 </span>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// week 7 unit conversion

let temperature = null;

function displayFarenheightTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  farenheightLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let farenheightTemperature2 = (temperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${farenheightTemperature2} °F`;
}

let farenheightLink = document.querySelector("#F");
farenheightLink.addEventListener("click", displayFarenheightTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheightLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature} °C`;
}

let celsiusLink = document.querySelector("#C");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
//week5 1
function Temperature(response) {
  console.log(response.data.weather[0].description);
  console.log(response.data);
  temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#temperature");
  let longitude = response.data.coord.lon;
  let latitude = response.data.coord.lat;
  let location = response.data.name;
  farenheightLink.classList.remove("active");
  celsiusLink.classList.remove("active");
  alert(
    `It is ${temperature} C° in ${location} at the longitude of ${longitude} and the latitude of ${latitude}.`
  );
  temperatureDisplay.innerHTML = `${temperature} C°`;
  displayForecast();
}

function displayTemperature(response) {
  response.preventDefault();
  let city2 = document.querySelector("#search-bar");
  let city3 = document.querySelector("#city-name");
  city3.innerHTML = `${city2.value}`;
  let apiKey = "14ae7857ff700daefb749e38ecc205df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city2.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(Temperature);
}

let currentCity3 = document.querySelector("#search-form");
currentCity3.addEventListener("submit", displayTemperature);

// week 7 add weather description
function DescriptionAndIcon(response) {
  let description = response.data.weather[0].description;
  let windspeed = response.data.wind.speed;
  let descriptionDisplay = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionDisplay.innerHTML = `${description} and a windspeed of ${windspeed} kilometers per hour`;
}

function displayDescription(response) {
  let city2 = document.querySelector("#search-bar");
  let apiKey = "14ae7857ff700daefb749e38ecc205df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city2.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(DescriptionAndIcon);
}

let currentCity4 = document.querySelector("#search-form");
currentCity4.addEventListener("submit", displayDescription);

//
function searchApi(place) {
  let apiKey = "14ae7857ff700daefb749e38ecc205df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${place.coords.latitude}&lon=${place.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(Temperature);
}

function locationClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchApi);
}

let currentCityClick = document.querySelector("#current-location");
currentCityClick.addEventListener("click", locationClick);
