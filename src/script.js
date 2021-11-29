//-----FORECAST DUPLICATION-----------

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 align-center">
            <div class="forecast-date">${forecastDay.dt}</div>
           <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="rain"
            class="forecast-icon"
            id="forecast-icon"
          />
            <span class="forecast-max">${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="forecast-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

//-------WEATHER / CITY ---------

function showTemperature(response) {
  console.log(response);
  console.log(response.data);
  console.log(response.data.main.temp);

  tempC = response.data.main.temp;
  let temp = document.querySelector("#temp");
  let inactiveUnitElement = document.querySelector("#inactive-unit");
  let city = document.querySelector("#city-name");
  let weatherDescription = document.querySelector("#weather-description");
  let precipitation = document.querySelector("#precipitation");
  let precipitationData = response.data.precipitation;
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");
  let icon = document.querySelector("#weather-icon");

  if (inactiveUnitElement.innerHTML === "°F") {
    temp.innerHTML = Math.round(tempC);
  } else {
    temp.innerHTML = Math.round((tempC * 9) / 5 + 32);
  }
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);

  if (precipitationData > 0) {
    precipitation.innerHTML = response.data.precipitation;
  } else {
    precipitation.innerHTML = 0;
  }

  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed * 3.6);

  getForecast(response.data.coord);
}

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `702dc019bcc0d6e4adaf624c3a66a5e5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function changeToCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-input").value;
  console.log(input);
  let apiKey = `702dc019bcc0d6e4adaf624c3a66a5e5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function defaultBehavior() {
  let city = "Vienna";
  let apiKey = `702dc019bcc0d6e4adaf624c3a66a5e5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let apiKey = `702dc019bcc0d6e4adaf624c3a66a5e5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

defaultBehavior();
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", changeToCurrentPosition);

let chooseLocationForm = document.querySelector("#city-search");
chooseLocationForm.addEventListener("submit", changeCity);

//--------UNIT CONVERSION-----------

let tempC = null;
let temp = document.querySelector("#temp");
temp.innerHTML = `${tempC}`;

function changeTemparatureUnit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let activeUnitElement = document.querySelector("#active-unit");
  let inactiveUnitElement = document.querySelector("#inactive-unit");
  let tempF = Math.round((tempC * 9) / 5 + 32);

  if (inactiveUnitElement.innerHTML === "°F") {
    temperatureElement.innerHTML = tempF;
    activeUnitElement.innerHTML = "°F";
    inactiveUnitElement.innerHTML = "°C";
  } else {
    temperatureElement.innerHTML = Math.round(tempC);
    activeUnitElement.innerHTML = "°C";
    inactiveUnitElement.innerHTML = "°F";
  }
}

let inactiveUnitElement = document.querySelector("#inactive-unit");
inactiveUnitElement.addEventListener("click", changeTemparatureUnit);

//-----TIME FORMAT-----------

function formatDate(date) {
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let currentMonth = months[date.getMonth()];

  let formatedDate = `${currentDay}, ${currentDate}.${currentMonth}.${currentYear}`;

  return formatedDate;
}

function formatTime(date) {
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let currentTimezone = -date.getTimezoneOffset() / 60;
  console.log(currentTimezone);

  let minutes = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

  if (minutes < 10) {
    currentMinute = minutes[date.getMinutes()];
  } else {
    currentMinute = date.getMinutes();
  }

  let timeZonePrefix = "";

  if (currentTimezone > 0) {
    timeZonePrefix = "+";
  } else {
    timeZonePrefix = "-";
  }

  let formatedTime = `${currentHour}:${currentMinute} UTC${timeZonePrefix}${currentTimezone}`;

  return formatedTime;
}

let currentDate = new Date();

console.log(formatDay(currentDate));

let day = document.querySelector("#current-day");
day.innerHTML = formatDay(currentDate);

let time = document.querySelector("#current-time");
time.innerHTML = formatTime(currentDate);
