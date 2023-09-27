// Dark Theme
function changeTheme() {
  let body = document.querySelector("body");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}

let changethemebutton = document.querySelector(".darkTheme-button");
changethemebutton.addEventListener("click", changeTheme);

// display the current date and time
function formatDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[today.getMonth()];
  let date = today.getDate();
  let year = today.getFullYear();
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${date}, ${year} <br> ${hours}:${minutes}`;
}

let todayDate = document.querySelector("#todayDate");
let today = new Date();
todayDate.innerHTML = formatDate(today);

// forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecastDate">${formatDay(forecastDay.time)}
        </div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" class="forecast-icon">
        </img>
        <div class="forecast-temperature">
          <span class="maxtemp"> ${Math.round(
            forecastDay.temperature.maximum
          )}° 
          </span>
          ~
          <span> ${Math.round(forecastDay.temperature.minimum)}° 
          </span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3d46ff005704t71ed8eo23bfda56259a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

// city name and temperature searched
function showTemperature(response) {
  let city = response.data.city;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = `${city}`;
  let country = response.data.country;
  let countryElement = document.querySelector("#country-name");
  countryElement.innerHTML = `${country}`;
  let weather = response.data.condition.description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${weather}`;
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let feels = response.data.temperature.feels_like;
  let feelsElement = document.querySelector("#perceived");
  feelsElement.innerHTML = `Perceived: ${feels}%`;
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind: ${windSpeed} m/s`;
  let emoji = response.data.condition.icon;
  let emojiElement = document.querySelector("#emoji");
  emojiElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji}.png`
  );

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "3d46ff005704t71ed8eo23bfda56259a";
  let apiEndpointCurrent = "https://api.shecodes.io/weather/v1/current";
  let apiEndpointForecast = "https://api.shecodes.io/weather/v1/forecast";
  let apiUrlCurrent = `${apiEndpointCurrent}?query=${city}&units=${units}&key=${apiKey}`;
  let apiUrlForecast = `${apiEndpointForecast}?query=${city}&units=${units}&key=${apiKey}`;

  axios.get(apiUrlCurrent).then(showTemperature);
  axios.get(apiUrlForecast).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;

  searchCity(city);
}

let searchContainer = document.querySelector("#search-container");
searchContainer.addEventListener("submit", handleSubmit);

// current geolocation
function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "metric";
  let apiKey = "3d46ff005704t71ed8eo23bfda56259a";
  let apiEndpointCurrent = "https://api.shecodes.io/weather/v1/current";
  let apiEndpointForecast = "https://api.shecodes.io/weather/v1/forecast";
  let apiUrlCurrent = `${apiEndpointCurrent}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  let apiUrlForecast = `${apiEndpointForecast}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrlCurrent).then(showTemperature);
  axios.get(apiUrlForecast).then(showForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Display currrent position when opening the page
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation();
