let weatherInput = document.getElementById("search");
let searchButton = document.querySelector(".search-img");
let weatherContainer = document.querySelector(".weather-container");
const date = new Date();
let day = date.getDay();

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const currentDay = daysOfWeek[day];

let data;

const getWeatherInfo = async () => {
  const cityWeather = weatherInput.value;
  weatherInput.value = "";
  let apiKey = "130b8da057b256780cea9d75e8fd5040";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityWeather}`;
  let weatherData = await fetch(apiLink + `&appid=${apiKey}`);
  data = await weatherData.json();
  let weatherDisplay = forecastCard(data);
  weatherContainer.innerHTML = weatherDisplay;
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".current-day").innerHTML = currentDay;
  document.querySelector(".weather-status").innerHTML = data.weather[0].main;

  let weatherStatus = document.querySelector(".weather-icons");
  if (data.weather[0].main === "Rain") {
    weatherStatus.src = "./images/rain.png";
  } else if (data.weather[0].main === "Clouds") {
    weatherStatus.src = "./images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherStatus.src = "./images/clear.png";
  } else if (data.weather[0].main === "Mist") {
    weatherStatus.src = "./images/mist.png";
  } else if (data.weather[0].main === "Snow") {
    weatherStatus.src = "./images/snow.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherStatus.src = "./images/drizzle.png";
  }
};

searchButton.addEventListener("click", getWeatherInfo);
// function getWeatherInfo() {

// }

// getWeatherInfo();

function forecastCard(data) {
  let weatherCard = `
    <div class="location d-flex">
    <h1 class="mb-smaller">My Location</h1>
    <p class="mb city"></p>
  </div>
  <div class="weather-card container">
    <h2 class="current-day"></h2>
    <img src="" alt="clear" class="weather-icons" />
    <div class="temperature d-flex mb j-center gap">
      <p class="deg">${Math.round(data.main.temp)}°C</p>
      <p class="weather-status"></p>
    </div>
    <div class="weather-info d-flex">
      <div class="d-flex gap-small">
        <img src="./images/wind.png" alt="wind" class="stats-icon" />
        <p class="wind-sp">Wind Speed: ${data.wind.speed} MPH</p>
      </div>
      <div class="d-flex gap-small">
        <img
          src="./images/humidity.png"
          alt="humidity"
          class="stats-icon"
        />
        <p class="humi">Humidity: ${data.main.humidity}%</p>
      </div>
    </div>
  </div>
    `;
  return weatherCard;
}

let tempOption = document.getElementById("temp-change");

tempOption.addEventListener("change", () => {
  let selectedOption = tempOption.value;
  let degreeContainer = document.querySelector(".deg");

  if (selectedOption !== "C") {
    let convertF = (Math.round(data.main.temp) * 9) / 5 + 32;
    degreeContainer.innerHTML = `${Math.round(convertF)}°F`;
  } else {
    degreeContainer.innerHTML = `${Math.round(data.main.temp)}°C`;
  }
});
