class WeatherData {
  static #apiKey = "RGKH28FJUVVG2258TNR3GFTZC";

  static async get(input, unit) {
    const formattedInput = input.replaceAll(",", "%2C").replaceAll(" ", "%20");

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedInput}/next7days?unitGroup=${unit}&include=hours&key=${this.#apiKey}&contentType=json`
    );

    const data = await response.json();

    return data;
  }
}

module.exports = WeatherData;
