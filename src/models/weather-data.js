const WeekModel = require("./week-model.js");
const DayModel = require("./day-model.js");
const HourModel = require("./hour-model.js");
const TimeUtil = require("../utility/time.js");

class WeatherData {
  static #apiKey = "RGKH28FJUVVG2258TNR3GFTZC";

  static async get(input, unit) {
    const formattedInput = input.replaceAll(",", "%2C").replaceAll(" ", "%20");

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedInput}/next7days?unitGroup=${unit}&include=hours&key=${this.#apiKey}&contentType=json`
    );

    const data = await response.json();

    const days = [];

    data.days.forEach((day) => {
      const hours = [];

      day.hours.forEach((hour) => {
        const hourModel = new HourModel(hour.datetime, hour.temp, hour.icon);
        hours.push(hourModel);
      });

      const dayModel = new DayModel(
        hours,
        day.datetime,
        day.icon,
        day.tempmax,
        day.tempmin
      );

      days.push(dayModel);
    });

    const tzoffset = data.tzoffset;

    const currentDateTime = TimeUtil.UTCDestructured(tzoffset);

    const weekModel = new WeekModel(
      days,
      data.resolvedAddress,
      currentDateTime
    );

    return weekModel;
  }
}

module.exports = WeatherData;
