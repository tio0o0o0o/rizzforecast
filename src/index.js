const LocationAutocomplete = require("./models/location-autocomplete.js");
const WeatherData = require("./models/weather-data.js");
const Debouncer = require("./utility/debouncer.js");
const debouncer = new Debouncer();
const LocationView = require("./views/location-view.js");
const locationView = new LocationView(document.querySelector("body"));

const search = document.querySelector("#search");

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
    locationView.createAll(response);
    const locationElements = document.querySelectorAll(".locationElement");
    locationElements.forEach((element) => {
      element.addEventListener("click", async () => {
        const weatherData = await WeatherData.get(
          element.textContent,
          "metric"
        );
        console.log(weatherData);
      });
    });
  }, 3000);
});
