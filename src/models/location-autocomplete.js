class LocationAutocomplete {
  static #apiKey = "f2d0387ffbf242a1adad5bfeed749423";

  static async get(input) {
    let addresses = [];

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${this.#apiKey}`,
      { method: "GET" }
    );

    const data = await response.json();

    data.features.forEach((address) => {
      const city = address.properties.city;
      const state = address.properties.state;
      const country = address.properties.country;

      let addressArr = [];

      if (city) addressArr.push(city);
      if (state) addressArr.push(state);
      if (country) addressArr.push(country);

      let addressStr = addressArr.join(", ");

      addresses.push(addressStr);
    });

    return addresses;
  }
}

module.exports = LocationAutocomplete;
