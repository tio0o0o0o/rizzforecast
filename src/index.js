const LocationAutocomplete = require("./models/location-autocomplete.js");
const WeatherData = require("./models/weather-data.js");
const Debouncer = require("./utility/debouncer.js");
const debouncer = new Debouncer();
const LocationView = require("./views/location-view.js");
const locationView = new LocationView(
  document.querySelector(".locationWrapper")
);

const WeatherView = require("./views/weather-view.js");
const weatherView = new WeatherView(document.querySelector("main"));

const search = document.querySelector("#search");

const ForecastView = require("./views/forecast-view.js");
const forecastView = new ForecastView(document.querySelector("main"));

require("./style.css");

// searchButton.addEventListener("click", async () => {
//   const keyword = search.value;
//   const response = await LocationAutocomplete.get(keyword);
//   console.log(response);
// });

// WeatherData.get("Tokyo, Japan", "metric").then((response) => {
//   console.log(response);
// });

search.addEventListener("input", () => {
  debouncer.debounce(async () => {
    const keyword = search.value;
    const response = await LocationAutocomplete.get(keyword);
    locationView.remove();
    locationView.createAll(response);
    const locationElements = document.querySelectorAll(".locationElement");
    locationElements.forEach((element) => {
      element.addEventListener("click", async () => {
        const weatherData = await WeatherData.get(
          element.textContent,
          "metric"
        );
        locationView.remove();
        console.log(weatherData);
        weatherView.remove();
        weatherView.create(weatherData);
        forecastView.createAll(weatherData.days);

        const expands = document.querySelectorAll(".expand");
        expands.forEach((expand) => {
          expand.addEventListener("click", () => {
            toggleExpand(expand);
          });
        });

        search.value = "";
      });
    });
  }, 1000);
});

function toggleExpand(expand) {
  const hoursBar = expand.parentNode.nextElementSibling;
  if (hoursBar.style.display === "flex") {
    console.log("Was flex");
    hoursBar.style.display = "none";
  } else {
    console.log("Was none");
    hoursBar.style.display = "flex";
  }
}

async function createDefault() {
  const wd = await WeatherData.get(
    "Dildo, Newfoundland and Labrador, NL, Canada",
    "metric"
  );
  locationView.remove();
  console.log(wd);
  weatherView.remove();
  weatherView.create(wd);
  forecastView.createAll(wd.days);

  const exp = document.querySelectorAll(".expand");
  exp.forEach((exp) => {
    exp.addEventListener("click", () => {
      toggleExpand(exp);
    });
  });
}

createDefault();
