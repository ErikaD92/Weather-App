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

// city name and temperature searched
function showTemperature(response) {
  console.log(response);
  let city = response.data.city;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = `${city}`;
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
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?query=${city}&units=${units}&key=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  console.log(city);

  searchCity(city);
}

let searchContainer = document.querySelector("#search-container");
searchContainer.addEventListener("submit", handleSubmit);

// current geolocation
function showPosition(position) {
  console.log(position);
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "bd7097700a582e58cd9044faf3a0db67";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

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
