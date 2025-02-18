class WeatherView {
  constructor(parent) {
    this.parent = parent;
  }

  create() {
    const today = document.createElement("div");
    const upcoming = document.createElement("div");

    today.setAttribute("class", "today");
    upcoming.setAttribute("class", "upcoming");

    this.parent.appendChild(today);
  }
  remove() {
    while (this.parent.hasChildNodes()) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }
}

module.exports = WeatherView;
