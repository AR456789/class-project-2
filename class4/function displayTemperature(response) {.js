function displayTemperature(response) {}

let ApiKey = "333d1e7c5f22cf63ff65c69aa26537e4";
let ApiUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;

axios.get(url).then(displayTemperature);
