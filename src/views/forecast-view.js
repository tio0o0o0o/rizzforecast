const TimeUtil = require("../utility/time.js");
const expandIcon = require("../assets/images/expand.svg");
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

class ForecastView {
  constructor(parent) {
    this.parent = parent;
  }

  createAll(days) {
    const forecast = document.createElement("div");
    forecast.setAttribute("class", "forecast");
    this.parent.appendChild(forecast);

    days.forEach((day, index) => {
      this.#create(day, forecast, index);
      this.#createHourlyInfo(day.hours, forecast, index);
    });
  }

  #create(dayInfo, parent, index) {
    const infoBar = document.createElement("div");
    infoBar.setAttribute("class", "infoBar");
    parent.appendChild(infoBar);

    const day = document.createElement("div");
    day.setAttribute("class", "day");
    if (index === 0) day.textContent = "Today";
    else day.textContent = TimeUtil.formatDayOfWeek(dayInfo.date);
    infoBar.appendChild(day);

    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weatherIcon");
    weatherIcon.src = icons[dayInfo.icon];
    infoBar.appendChild(weatherIcon);

    const temp = document.createElement("div");
    temp.setAttribute("class", "temp");
    infoBar.appendChild(temp);

    const tempmax = document.createElement("div");
    tempmax.setAttribute("class", "tempmax");
    tempmax.textContent = `${dayInfo.tempmax}°`;
    temp.appendChild(tempmax);

    const tempmin = document.createElement("div");
    tempmin.setAttribute("class", "tempmin");
    tempmin.textContent = `${dayInfo.tempmin}°`;
    temp.appendChild(tempmin);

    const expand = document.createElement("input");
    expand.setAttribute("type", "image");
    expand.setAttribute("class", "expand");
    expand.src = expandIcon;
    infoBar.appendChild(expand);
  }

  #createHourlyInfo(hours, parent, index) {
    const hourlyInfoBar = document.createElement("div");
    hourlyInfoBar.setAttribute("class", "hourlyInfoBar");
    parent.appendChild(hourlyInfoBar);

    hours.forEach((hour) => {
      this.#createHour(hour, hourlyInfoBar);
    });
  }

  #createHour(hourData, parent) {
    const hourInfo = document.createElement("div");
    hourInfo.setAttribute("class", "hourInfo");
    parent.appendChild(hourInfo);

    const hour = document.createElement("div");
    hour.setAttribute("class", "hour");
    hour.textContent = TimeUtil.timeFormatSmall(hourData.time);
    hourInfo.appendChild(hour);

    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weatherIcon");
    weatherIcon.src = icons[hourData.icon];
    hourInfo.appendChild(weatherIcon);

    const temp = document.createElement("div");
    temp.setAttribute("class", "temp");
    temp.textContent = `${hourData.temp}°`;
    hourInfo.appendChild(temp);
  }

  remove() {
    while (this.parent.hasChildNodes()) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }
}

module.exports = ForecastView;
