function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;


    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);

    cityElement.classList.remove("hidden");
    document.querySelector("#about").classList.remove("hidden");
    document
      .querySelector(".weather-app-temperature")
      .classList.remove("hidden");

      getForecast(response.data.city);
}

    function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
    let apiKey = "5a40eb0c0d6668b4da5oc31d5aa39t3f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    document.querySelector("#city").classList.add("hidden");
    document.querySelector("#about").classList.add("hidden");
    document.querySelector(".weather-app-temperature").classList.add("hidden");
  
    searchCity(searchInput.value);
    forecastVisible = true;
    displayForecast();
}

function getForecast(city) {
  let apiKey = "5a40eb0c0d6668b4da5oc31d5aa39t3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);

}

let forecastVisible = false;
let forecastElement = document.querySelector("#forecast");

function formatDay (timestamp){
  let date = new Date(timestamp *1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}


function showForecast(response) {

  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-week">
      <div class="forecast-week-day">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="forecast-week-icon" />
        <div class="weather-temperature">
          <div class="temperature">${Math.round(day.temperature.maximum)}°</div>
          <div class="temperature">${Math.round(day.temperature.minimum)}°</div>
        </div>
    </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  document.querySelector("#city").classList.add("hidden");
  document.querySelector("#about").classList.add("hidden");
  document.querySelector(".weather-app-temperature").classList.add("hidden");

  searchCity(searchInput.value);
  forecastVisible = true;
  displayForecast();
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast(response) {
  if (forecastVisible) {
    showForecast(response);
  }
}

displayForecast();
