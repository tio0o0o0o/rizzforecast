const TimeUtil = require("../utility/time.js");
const icons = {
  snow: require("../assets/images/snow.svg"),
  rain: require("../assets/images/rain.svg"),
  fog: require("../assets/images/fog.svg"),
  wind: require("../assets/images/wind.svg"),
  cloudy: require("../assets/images/cloudy.svg"),
  "partly-cloudy-day": require("../assets/images/partly-cloudy-day.svg"),
  "partly-cloudy-night": require("../assets/images/partly-cloudy-night.svg"),
  "clear-day": require("../assets/images/clear-day.svg"),
  "clear-night": require("../assets/images/clear-night.svg"),
};
const day = require("../assets/images/day.png");
const night = require("../assets/images/night.png");

class WeatherView {
  constructor(parent) {
    this.parent = parent;
  }

  createAll() {}

  create(weatherData) {
    const now = document.createElement("div");
    now.setAttribute("class", "now");

    const locationAndDate = document.createElement("div");
    locationAndDate.setAttribute("class", "locationAndDate");
    now.appendChild(locationAndDate);

    const location = document.createElement("div");
    location.setAttribute("class", "location");
    location.textContent = weatherData.address;
    locationAndDate.appendChild(location);

    const icon = document.createElement("img");
    icon.setAttribute("class", "icon");
    icon.src = icons[weatherData.getCurrentHour().icon];
    now.appendChild(icon);

    const date = document.createElement("div");
    date.setAttribute("class", "date");
    date.textContent = `${TimeUtil.formatDayOfWeekLong(`${weatherData.currentDateTime.year}-${weatherData.currentDateTime.month}-${weatherData.currentDateTime.day}`)}, ${TimeUtil.monthFormatToWord(weatherData.currentDateTime.month)} ${weatherData.currentDateTime.day}, ${weatherData.currentDateTime.year}`;
    locationAndDate.appendChild(date);

    const time = document.createElement("div");
    time.setAttribute("class", "time");
    time.textContent = TimeUtil.timeFormat(weatherData.currentDateTime.time);
    now.appendChild(time);

    const temp = document.createElement("div");
    temp.setAttribute("class", "temp");
    temp.textContent = weatherData.getCurrentHour().temp + "°";
    now.appendChild(temp);

    const currentHour = Number(weatherData.currentDateTime.time.slice(0, 2));

    if (currentHour >= 7 && currentHour <= 18) {
      console.log("Day");
      now.style.backgroundImage = `url(${day})`;
    } else {
      console.log("Night");
      now.style.backgroundImage = `url(${night})`;
    }

    this.parent.appendChild(now);
  }

  createForecast() {}

  remove() {
    while (this.parent.hasChildNodes()) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }
}

module.exports = WeatherView;
