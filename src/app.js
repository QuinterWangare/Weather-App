function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature-degree-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity-value");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
      src= "${response.data.condition.icon_url}"
      class="weather-app-icon"
    />`;
  timeElement.innerHTML = formatDate(date);
  weatherDescription.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
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

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "21467o0f2a3b311a0c713aaae1ct64a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function cityInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-icon">
                  <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
                />
                </div>
                <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-max-temperature">
                    <strong>15°</strong>
                    <span class="weather-forecast-min-temperature">9°</span>
                  </div>
                </div>
                </div>`;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", cityInput);

searchCity("Nairobi");

displayForecast();
