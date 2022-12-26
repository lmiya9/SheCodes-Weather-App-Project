function showTempCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  let cityName = document.querySelector("#city-title");

  cityName.innerHTML = `${city}`;
  currentTemp.innerHTML = `${temperature}°C`;
}

function retrieveCity(event) {
  event.preventDefault();
  let apiKey = "6782253072f7d90462731a624097fc54";
  let units = "metric";
  let cityInput = document.querySelector("#city-input").value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTempCity);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", retrieveCity);

function showCurrentTempCity(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentCityName = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city-title");

  currentTemp.innerHTML = `${temperature}°C`;
  currentCity.innerHTML = `${currentCityName}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayDate() {
  let now = new Date();
  let minutes = now.getMinutes();
  let hour = now.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${day}, ${hour}:${minutes}`;
}

displayDate();

function cityDisplay(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  let cityTitle = document.querySelector("#city-title");
  cityTitle.innerHTML = capitalizeFirstLetter(cityName.value);
}

let locationButton = document.querySelector("#location-button");

// Gets called on click
locationButton.addEventListener("click", onLocationClick);
function onLocationClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(onPositionReceived);
}

function onPositionReceived(position) {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl1).then(showTempCity);
}

// Called right when the page begins
navigator.geolocation.getCurrentPosition(onPositionReceived);
