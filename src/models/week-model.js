class WeekModel {
  constructor(days, address, currentDateTime) {
    this.days = days;
    this.address = address;
    this.currentDateTime = currentDateTime;
  }

  getCurrentHour() {
    return this.days[0].hours.find((hour) => {
      return this.currentDateTime.time.slice(0, 2) === hour.time.slice(0, 2);
    });
  }
}

module.exports = WeekModel;
