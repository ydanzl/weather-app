let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

function cityWeather() {
  let city = prompt("Enter a city").trim().toLowerCase();

  if (weather[city] !== undefined) {
    let tempC = Math.round(weather[city].temp);
    let tempF = Math.round((weather[city].temp * 9) / 5 + 32);
    let humidity = weather[city].humidity;

    alert(
      `It is currently ${tempC}°C (${tempF}°F) in ${city} with a humidity of ${humidity}%.`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
    );
  }
}

//cityWeather();

//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

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

//🕵️‍♀️Feature #2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  let input = document.querySelector("#city-search-input");
  city.innerHTML = `${input.value}`;
}

let citySearchForm = document.querySelector("#city-search");
citySearchForm.addEventListener("submit", changeCity);

//🙀Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.
let tempC = 30;
let celsius = document.querySelector("#celsius");
celsius.innerHTML = `${tempC}°C`;
let tempF = (tempC * 9) / 5 + 32;
console.log(tempF);

function changeTemparatureUnitFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.innerHTML = `${tempF}°F`;
  celsius.innerHTML = `<a href=#>°C</a>`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.innerHTML = `<a href=#>°F</a>`;
fahrenheit.addEventListener("click", changeTemparatureUnitFahrenheit);

function changeTemparatureUnitCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#celsius");
  celsius.innerHTML = `${tempC}°C`;
  fahrenheit.innerHTML = `<a href=#>°F</a>`;
}

celsius.addEventListener("click", changeTemparatureUnitCelsius);
