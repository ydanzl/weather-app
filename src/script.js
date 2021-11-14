//-------WEATHER / CITY ---------

function showTemperature(response) {
  console.log(response);
  console.log(response.data);
  console.log(response.data.main.temp);

  let temp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-name");
  let weatherDescription = document.querySelector("#weather-description");
  let precipitation = document.querySelector("#precipitation");
  let precipitationData = response.data.precipitation;
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");

  temp.innerHTML = `${temperature}`;
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;

  if (precipitationData > 0) {
    precipitation.innerHTML = response.data.precipitation;
  } else {
    precipitation.innerHTML = 0;
  }

  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
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
  event.preventDefault();
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

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", changeToCurrentPosition);

let chooseLocationForm = document.querySelector("#city-search");
chooseLocationForm.addEventListener("submit", changeCity);

//-----TIME FORMAT-----------

function formatDay(date) {
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let currentTimezone = date.getTimezoneOffset();

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

  let formatedDay = `${currentDay}, ${currentDate}.${currentMonth}.${currentYear}`;

  return formatedDay;
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
