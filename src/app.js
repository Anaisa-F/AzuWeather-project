// Local time
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let actualDate = date.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let year = date.getFullYear();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${actualDate} ${month} ${year}, ${hours}:${minutes}`;
}

//timestamp for next 5 days weather

function formatDateFiveDays(timestamp) {
  let date = new Date(timestamp);

  let actualDate = date.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${actualDate} ${month}<br` + `><strong>${day}</strong>`;
}
// Search Engine - The user searches for its current location or by city;
// If searching by city, once typed the button "go" will give an alert warning the city it's being loaded;
// The city and its details will show;
// If no city it's populated an alert will pop up too.

function searchCityForm(city) {
  let apiKey = "8aad1c1ba226eed51460cd1b41a86b50";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${url}&appid=${apiKey}`).then(displayCityWeatherDetails);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-button");
  searchCityForm(searchInput.value);
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    alert(`Searching the weather in ${searchInput.value} ⏳`);
    h2.innerHTML = `${searchInput.value}`;
  } else {
    h2.innerHTML = null;
    alert(
      `Please type the city you are looking so we check the weather for you!`
    );
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayCityWeatherDetails(response) {
  console.log(response.data);

  let cityDate = formatDate(response.data.dt * 1000);
  let grabDate = document.querySelector("#date");
  grabDate.innerHTML = `${cityDate}`;

  let city = response.data.name;
  let grabCity = document.querySelector("#city");
  grabCity.innerHTML = `${city}`;

  let icon = response.data.weather[0].icon;
  grabMainIcon = document.querySelector("#main-icon");
  grabMainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  celciusTemperature = response.data.main.temp;
  let temperature = Math.round(celciusTemperature);
  let grabTempId = document.querySelector("#temperature");
  grabTempId.innerHTML = `${temperature}`;

  let weatherDescrip = response.data.weather[0].main;
  let grabWeatherDescrip = document.querySelector("#weather-description");
  grabWeatherDescrip.innerHTML = `<strong>${weatherDescrip}</strong>`;

  let humidity = response.data.main.humidity;
  let grabHumidity = document.querySelector("#humidity-results");
  grabHumidity.innerHTML = `${humidity}%`;

  let pressure = response.data.main.pressure;
  let grabPressure = document.querySelector("#pressure-results");
  grabPressure.innerHTML = `${pressure}mb`;

  let windSpeed = response.data.wind.speed;
  let grabWindSpeed = document.querySelector("#wind-results");
  grabWindSpeed.innerHTML = `${windSpeed}Km/h`;
}

// Current location - The user clicks in the search location icon;
// It will present the current position;
// City will show and its weather details too.

function showLocation(position) {
  let apiKey = "8aad1c1ba226eed51460cd1b41a86b50";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${url}&appid=${apiKey}`).then(displayCityWeatherDetails);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationIcon = document.querySelector("#current-location");
locationIcon.addEventListener("click", getCurrentPosition);

//Show temperature in Celcius and Fahrenheit

function showCTemp(event) {
  event.preventDefault();
  fahrenheitTemp.classList.remove("active");
  celciusTemp.classList.add("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
}

function showFTemp(event) {
  event.preventDefault();
  celciusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let temperature = document.querySelector("#temperature");
  let fTemp = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fTemp);
}

let celciusTemperature = null;

let celciusTemp = document.querySelector("#celcius");
celciusTemp.addEventListener("click", showCTemp);

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", showFTemp);

// Forecast for the next 5 days
// Box next to actual day will represent the next day

function displayForecast(response) {
  let forecastNextDay = document.querySelector("#forecast-next-day");
  let forecast = response.data.list[8];
  console.log(forecast);

  forecastNextDay.innerHTML = `
     ${formatDateFiveDays(forecast.dt * 1000)}
      <br />
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png"/>
      <br />
      <strong>${Math.round(forecast.main.temp_max)}°</strong>
      ${Math.round(forecast.main.temp_min)}°
  </div>`;

  // Rows at the bottom of the page will represent the remaining four days

  let forecastNextFourDays = document.querySelector("#forecast-next-four-days");
  forecastNextFourDays.innerHTML = "";

  let forecastDayOne = response.data.list[15];
  forecastNextFourDays.innerHTML += `
  <div class="col col-lg-2">
  ${formatDateFiveDays(forecastDayOne.dt * 1000)}
  <br />
  <img src="http://openweathermap.org/img/wn/${
    forecastDayOne.weather[0].icon
  }@2x.png"/>
  </div>`;

  let forecastDayTwo = response.data.list[23];
  forecastNextFourDays.innerHTML += `
  <div class="col col-lg-2">
  ${formatDateFiveDays(forecastDayTwo.dt * 1000)}
  <br />
  <img src="http://openweathermap.org/img/wn/${
    forecastDayTwo.weather[0].icon
  }@2x.png"/>
  </div>`;

  let forecastDayThree = response.data.list[31];
  forecastNextFourDays.innerHTML += `
  <div class="col col-lg-2">
  ${formatDateFiveDays(forecastDayThree.dt * 1000)}
  <br />
  <img src="http://openweathermap.org/img/wn/${
    forecastDayThree.weather[0].icon
  }@2x.png"/>
  </div>`;

  let forecastDayFour = response.data.list[39];
  forecastNextFourDays.innerHTML += `
  <div class="col col-lg-2">
  ${formatDateFiveDays(forecastDayFour.dt * 1000)}
  <br />
  <img src="http://openweathermap.org/img/wn/${
    forecastDayFour.weather[0].icon
  }@2x.png"/>
  </div>`;
}
