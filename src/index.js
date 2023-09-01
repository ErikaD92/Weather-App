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
function showForecast(response) {
  console.log(response);

  let emoji1 = response.data.daily[0].condition.icon;
  let emojiElement1 = document.querySelector("#emoji-day1");
  emojiElement1.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji1}.png`
  );
  let maxTemperature1 = Math.round(response.data.daily[0].temperature.maximum);
  let maxTemperatureElement1 = document.querySelector("#maxtemperature-day1");
  maxTemperatureElement1.innerHTML = `${maxTemperature1}°`;
  let minTemperature1 = Math.round(response.data.daily[0].temperature.minimum);
  let minTemperatureElement1 = document.querySelector("#mintemperature-day1");
  minTemperatureElement1.innerHTML = `${minTemperature1}°`;
  let emoji2 = response.data.daily[0].condition.icon;
  let emojiElement2 = document.querySelector("#emoji-day2");
  emojiElement2.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji2}.png`
  );
  let maxTemperature2 = Math.round(response.data.daily[1].temperature.maximum);
  let maxTemperatureElement2 = document.querySelector("#maxtemperature-day2");
  maxTemperatureElement2.innerHTML = `${maxTemperature2}°`;
  let minTemperature2 = Math.round(response.data.daily[1].temperature.minimum);
  let minTemperatureElement2 = document.querySelector("#mintemperature-day2");
  minTemperatureElement2.innerHTML = `${minTemperature2}°`;
  let emoji3 = response.data.daily[2].condition.icon;
  let emojiElement3 = document.querySelector("#emoji-day3");
  emojiElement3.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji3}.png`
  );
  let maxTemperature3 = Math.round(response.data.daily[2].temperature.maximum);
  let maxTemperatureElement3 = document.querySelector("#maxtemperature-day3");
  maxTemperatureElement3.innerHTML = `${maxTemperature3}°`;
  let minTemperature3 = Math.round(response.data.daily[2].temperature.minimum);
  let minTemperatureElement3 = document.querySelector("#mintemperature-day3");
  minTemperatureElement3.innerHTML = `${minTemperature3}°`;
  let emoji4 = response.data.daily[3].condition.icon;
  let emojiElement4 = document.querySelector("#emoji-day4");
  emojiElement4.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji4}.png`
  );
  let maxTemperature4 = Math.round(response.data.daily[3].temperature.maximum);
  let maxTemperatureElement4 = document.querySelector("#maxtemperature-day4");
  maxTemperatureElement4.innerHTML = `${maxTemperature4}°`;
  let minTemperature4 = Math.round(response.data.daily[3].temperature.minimum);
  let minTemperatureElement4 = document.querySelector("#mintemperature-day4");
  minTemperatureElement4.innerHTML = `${minTemperature4}°`;
  let emoji5 = response.data.daily[4].condition.icon;
  let emojiElement5 = document.querySelector("#emoji-day5");
  emojiElement5.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji5}.png`
  );
  let maxTemperature5 = Math.round(response.data.daily[4].temperature.maximum);
  let maxTemperatureElement5 = document.querySelector("#maxtemperature-day5");
  maxTemperatureElement5.innerHTML = `${maxTemperature5}°`;
  let minTemperature5 = Math.round(response.data.daily[4].temperature.minimum);
  let minTemperatureElement5 = document.querySelector("#mintemperature-day5");
  minTemperatureElement5.innerHTML = `${minTemperature5}°`;
  let emoji6 = response.data.daily[5].condition.icon;
  let emojiElement6 = document.querySelector("#emoji-day6");
  emojiElement6.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji6}.png`
  );
  let maxTemperature6 = Math.round(response.data.daily[5].temperature.maximum);
  let maxTemperatureElement6 = document.querySelector("#maxtemperature-day6");
  maxTemperatureElement6.innerHTML = `${maxTemperature6}°`;
  let minTemperature6 = Math.round(response.data.daily[5].temperature.minimum);
  let minTemperatureElement6 = document.querySelector("#mintemperature-day6");
  minTemperatureElement6.innerHTML = `${minTemperature6}°`;
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
  let temperature = Math.round(response.data.temperature.current);
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
  windSpeedElement.innerHTML = `Wind: ${windSpeed}m/s`;
  let emoji = response.data.condition.icon;
  let emojiElement = document.querySelector("#emoji");
  emojiElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji}.png`
  );
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

// Display a fake temperature in Celsius and add a link to convert it to Fahrenheit.
// Fahrenheit = (Celsius x 1.8) + 32
function fahrenheitButton(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheit = parseFloat(temperature.innerHTML) * 1.8 + 32;
  temperature.innerHTML = fahrenheit.toFixed(0);
}

let fahrenheitTemp = document.querySelector("#fahrenheitTemp");
fahrenheitTemp.addEventListener("click", fahrenheitButton);

// Celsius = (Fahrenheit - 32) / 1.8
function celsiusButton(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsius = (parseFloat(temperature.innerHTML) - 32) / 1.8;
  temperature.innerHTML = celsius.toFixed(0);
}

let celsiusTemp = document.querySelector("#celsiusTemp");
celsiusTemp.addEventListener("click", celsiusButton);
