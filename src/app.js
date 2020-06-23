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
// Search Engine - The user searches for its current location or by city;
// If searching by city, once typed the button "go" will give an alert warning the city it's being loaded;
// The city and its details will show;
// If no city it's populated an alert will pop up too.

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-button");
  let city = `${searchInput.value}`;
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    alert(`Searching the weather in ${searchInput.value} ⏳`);
    h2.innerHTML = `${searchInput.value}`;
  } else {
    h2.innerHTML = null;
    alert(`Please type the city you are looking to check the weather.`);
  }
  let apiKey = "8aad1c1ba226eed51460cd1b41a86b50";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${url}&appid=${apiKey}`).then(displayCityWeatherDetails);
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

  let celcius = Math.round(response.data.main.temp);
  let grabTempId = document.querySelector("#temperature");
  grabTempId.innerHTML = `${celcius}°C`;

  let weatherDescrip = response.data.weather[0].main;
  let grabWeatherDescrip = document.querySelector("#weather-description");
  grabWeatherDescrip.innerHTML = `${weatherDescrip}`;

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
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationIcon = document.querySelector("#current-location");
locationIcon.addEventListener("click", getCurrentPosition);
