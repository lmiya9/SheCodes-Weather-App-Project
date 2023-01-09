function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row d-flex justify-content-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
                
              <div class="col-2">
                <div class="forecast-day">${formatTimestamp(
                  forecastDay.dt
                )}</div> 
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" width="70px"/>
                <div class="forecast-temp">
                  <span class="forecast-max" >${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                <span class="forecast-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
              </div>
            
            `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
  forecastHTML = `</div>`;
}

function getForecast(coordinates) {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

function showTempCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  let currentTemp = document.querySelector("#temperature");
  let cityName = document.querySelector("#city-title");
  let icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  cityName.textContent = `${city}`;
  currentTemp.innerHTML = `${temperature}<sup class = "degrees">°C</sup>`;
  weatherDescription.innerHTML = response.data.weather[0].description;

  let iconElem = document.querySelector("#main-image");
  iconElem.src = icon;

  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");

  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;

  getForecast(response.data.coord);
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

  currentTemp.innerHTML = `${temperature}<sup class = "degrees">°C</sup>`;
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
  let time = document.querySelector("#time");
  time.innerHTML = `Last updated: ${day}, ${hour}:${minutes}`;
}

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

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

displayDate();
