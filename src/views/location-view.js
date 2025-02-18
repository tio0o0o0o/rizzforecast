class LocationView {
  constructor(parent) {
    this.parent = parent;
  }

  createAll(locations) {
    locations.forEach((location) => {
      this.#create(location);
    });
  }

  #create(location) {
    const locationElement = document.createElement("div");
    locationElement.setAttribute("class", "locationElement");
    locationElement.textContent = location;
    this.parent.appendChild(locationElement);
  }

  remove() {
    while (this.parent.hasChildNodes()) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }
}

module.exports = LocationView;
