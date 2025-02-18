const TimeUtil = require("../utility/time.js");

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
    temp.textContent = "69c";
    now.appendChild(temp);

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
